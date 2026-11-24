import { get, type GetBlobResult } from '@vercel/blob';

export type PrivateBlobGetFn = (
  pathname: string,
  options: {
    access: 'private';
    useCache?: boolean;
    token?: string;
    abortSignal?: AbortSignal;
  },
) => Promise<GetBlobResult | null>;

export type ReadPrivateBlobOptions = {
  token?: string;
  useCache?: boolean;
  maxAttempts?: number;
  attemptTimeoutMs?: number;
  /**
   * Defaults to false (fail-closed) so credentials, single-use recovery markers,
   * and read-modify-write state transitions never read stale cached data.
   */
  allowCachedFallbackOn5xx?: boolean;
  getImpl?: PrivateBlobGetFn;
};

export function isBlobNotFoundError(error: unknown): boolean {
  const msg = error instanceof Error ? error.message : String(error);
  const name = error instanceof Error ? error.name : '';
  return /not found|\b404\b|BlobNotFoundError/i.test(`${name} ${msg}`);
}

export function isTransientBlobReadError(error: unknown): boolean {
  if (isBlobNotFoundError(error)) return false;
  const msg = error instanceof Error ? error.message : String(error);
  const name = error instanceof Error ? error.name : '';
  const combined = `${name} ${msg}`;

  // Never retry auth, permission, or malformed request errors
  if (/BlobAccessError|\b(400|401|403)\b|invalid token|forbidden|unauthorized/i.test(combined)) {
    return false;
  }

  return /\b(429|500|502|503|504)\b|Failed to fetch blob:\s*5\d\d|BlobServiceNotAvailable|BlobServiceRateLimited|ECONNRESET|ETIMEDOUT|EAI_AGAIN|fetch failed|Premature close|socket hang up|TimeoutError|AbortError/i.test(
    combined,
  );
}

function sleepMs(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function readPrivateBlobText(
  pathname: string,
  options: ReadPrivateBlobOptions = {},
): Promise<string | null> {
  const token = (options.token ?? process.env.BLOB_READ_WRITE_TOKEN ?? '').trim();
  if (!token) return null;

  const maxAttempts = Math.max(1, Math.min(5, options.maxAttempts ?? 3));
  const timeoutMs = Math.max(1000, options.attemptTimeoutMs ?? 9000);
  const baseUseCache = options.useCache ?? false;
  const allowCachedFallback = options.allowCachedFallbackOn5xx === true;
  const getter: PrivateBlobGetFn = options.getImpl ?? get;

  let lastError: unknown = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const useCacheForAttempt =
      attempt === maxAttempts && maxAttempts > 1 && allowCachedFallback ? true : baseUseCache;

    try {
      const result = await getter(pathname, {
        access: 'private',
        useCache: useCacheForAttempt,
        token,
        abortSignal: AbortSignal.timeout(timeoutMs),
      });
      if (!result || result.statusCode !== 200 || !result.stream) {
        return null;
      }
      // Consume the body inside the retry loop so mid-stream resets are also retried
      return await new Response(result.stream).text();
    } catch (error) {
      if (isBlobNotFoundError(error)) {
        return null;
      }
      lastError = error;
      if (attempt < maxAttempts && isTransientBlobReadError(error)) {
        const baseDelay = attempt === 1 ? 140 : 380 * (attempt - 1);
        const jitter = Math.floor(Math.random() * 70);
        await sleepMs(baseDelay + jitter);
        continue;
      }
      throw error;
    }
  }

  if (lastError) throw lastError;
  return null;
}

export async function readPrivateBlobJson<T>(
  pathname: string,
  options: ReadPrivateBlobOptions = {},
): Promise<T | null> {
  const text = await readPrivateBlobText(pathname, options);
  if (!text) return null;
  return JSON.parse(text) as T;
}

export async function mapWithConcurrency<T, R>(
  items: readonly T[],
  concurrency: number,
  worker: (item: T, index: number) => Promise<R>,
  onError?: (error: unknown, item: T) => void,
): Promise<R[]> {
  const safeConcurrency = Math.max(1, Math.floor(concurrency));
  const results: Array<{ ok: true; value: R } | { ok: false }> = new Array(items.length);
  let cursor = 0;

  async function runLane(): Promise<void> {
    while (cursor < items.length) {
      const idx = cursor;
      cursor += 1;
      const item = items[idx];
      try {
        const val = await worker(item, idx);
        results[idx] = { ok: true, value: val };
      } catch (err) {
        results[idx] = { ok: false };
        if (onError) onError(err, item);
      }
    }
  }

  const lanes = Array.from({ length: Math.min(safeConcurrency, items.length) }, () => runLane());
  await Promise.all(lanes);

  const out: R[] = [];
  for (const r of results) {
    if (r && r.ok) out.push(r.value);
  }
  return out;
}
