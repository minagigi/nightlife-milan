export const DEFAULT_INDEXNOW_KEY = 'e79ae0f09df1864e2f28815ac29a21c91f4bdf731754743c';

export interface IndexNowBatchResult {
  ok: boolean;
  submittedCount: number;
  batches: number;
  statuses: number[];
  error?: string;
}

/**
 * Notifies Bing, Yandex, Seznam, and Naver via the IndexNow protocol whenever
 * new or updated canonical URLs appear in Nightlife Milan's sitemap.
 * Safe and non-blocking: never throws if IndexNow is temporarily unreachable.
 */
export async function pingIndexNowUrls(
  urls: readonly string[],
  baseUrl = process.env.APP_URL || 'https://nightlifemilan.com',
): Promise<IndexNowBatchResult> {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const key = (process.env.INDEXNOW_KEY || DEFAULT_INDEXNOW_KEY).trim();
  if (!key || urls.length === 0) {
    return { ok: true, submittedCount: 0, batches: 0, statuses: [] };
  }

  let host: string;
  try {
    host = new URL(cleanBase).host;
  } catch {
    host = 'nightlifemilan.com';
  }

  const validUrls = Array.from(
    new Set(
      urls.filter((u) => {
        try {
          const parsed = new URL(u);
          return parsed.host === host && (parsed.protocol === 'https:' || parsed.protocol === 'http:');
        } catch {
          return false;
        }
      }),
    ),
  );

  if (validUrls.length === 0) {
    return { ok: true, submittedCount: 0, batches: 0, statuses: [] };
  }

  const keyLocation = `${cleanBase}/${key}.txt`;
  const chunkSize = 5000;
  const statuses: number[] = [];
  let submittedCount = 0;
  let batches = 0;

  try {
    for (let i = 0; i < validUrls.length; i += chunkSize) {
      const urlList = validUrls.slice(i, i + chunkSize);
      batches += 1;
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 8000);
      try {
        const res = await fetch('https://api.indexnow.org/indexnow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify({
            host,
            key,
            keyLocation,
            urlList,
          }),
          signal: controller.signal,
        });
        statuses.push(res.status);
        if (res.ok || res.status === 202) {
          submittedCount += urlList.length;
        }
      } finally {
        clearTimeout(timer);
      }
    }
    return {
      ok: statuses.every((s) => s >= 200 && s < 300),
      submittedCount,
      batches,
      statuses,
    };
  } catch (err) {
    return {
      ok: false,
      submittedCount,
      batches,
      statuses,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
