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
      for (const image of await page.locator('main img').all()) {
        if (!await image.isVisible()) continue;
        await image.scrollIntoViewIfNeeded();
        await page.waitForFunction(img => img.complete && img.naturalWidth > 0, await image.elementHandle());
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: new URL(`${name}-${device}.png`, output).pathname, fullPage: true });
    }
    await page.close();
  }
} finally {
  await browser.close();
}
