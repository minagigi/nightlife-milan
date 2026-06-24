// Hook PostToolUse: auto-optimize new images written to public/images/
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const input = JSON.parse(readFileSync(0, 'utf8'));
const filePath = input?.tool_input?.file_path || '';
if (/public[/\\]images[/\\].*\.(jpg|jpeg|png)$/i.test(filePath)) {
  console.log('[auto-optimize] detected image write:', filePath);
  execSync('node scripts/optimize-images.mjs', { stdio: 'inherit' });
}
