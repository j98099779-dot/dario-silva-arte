import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

// Start the production server with npm run start before capturing.
const output = new URL('../docs/screenshots/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH });
try {
  for (const [device, width, height] of [['desktop', 1440, 1000], ['mobile', 375, 812]]) {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
    for (const [name, route] of [['home', '/'], ['artista', '/o-artista']]) {
      await page.goto(`http://127.0.0.1:3000${route}`, { waitUntil: 'networkidle' });
      await page.screenshot({ path: new URL(`${name}-${device}.png`, output).pathname, fullPage: true });
    }
    await page.close();
  }
} finally {
  await browser.close();
}
