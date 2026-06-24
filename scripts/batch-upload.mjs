/**
 * batch-upload.mjs — parallel PUT uploads via curl
 * Usage: node scripts/batch-upload.mjs <json-file>
 * JSON: [{ file, url }, ...]
 */
import { readFileSync } from 'fs';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);
const pairs = JSON.parse(readFileSync(process.argv[2], 'utf8'));

async function put(file, url) {
  let stdout = '';
  try {
    ({ stdout } = await execFileAsync('curl', [
      '-s', '-o', 'NUL', '-w', '%{http_code}',
      '-X', 'PUT',
      '-H', 'Content-Type: image/jpeg',
      '--data-binary', `@${file}`,
      url,
    ], { maxBuffer: 8 * 1024 * 1024 }));
  } catch (e) {
    stdout = e.stdout || '';
  }
  console.log(`${stdout.trim()} ${file}`);
}

await Promise.all(pairs.map(({ file, url }) => put(file, url)));
