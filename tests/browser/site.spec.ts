import { test, expect, type Locator, type Page } from '@playwright/test';
import { artworks, getArtwork } from '../../data/artworks';
import { artist } from '../../data/artist';
import { curation } from '../../data/curation';

const navigation = [
  { label: 'Obras', route: '/obras' },
  { label: 'O Artista', route: '/o-artista' },
  { label: 'Trajetória', route: '/trajetoria' },
  { label: 'Contato', route: '/contato' },
];

async function openNavigation(page: Page) {
  const menu = page.locator('header').getByRole('button', { name: /menu|fechar/i });
  if (await menu.isVisible() && await menu.getAttribute('aria-expanded') !== 'true') {
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
  }
  return page.getByRole('navigation', { name: 'Navegação principal', includeHidden: true });
}

async function expectRealImage(image: Locator, expectedSource?: string) {
  await expect(image).toBeVisible();
  await image.scrollIntoViewIfNeeded();
  await expect.poll(() => image.evaluate(element => {
    const imageElement = element as HTMLImageElement;
    return imageElement.complete && imageElement.naturalWidth > 0 && imageElement.naturalHeight > 0;
  })).toBe(true);

  const dimensions = await image.evaluate(element => {
    const imageElement = element as HTMLImageElement;
    const bounds = imageElement.getBoundingClientRect();
    return {
      currentSource: imageElement.currentSrc,
      width: imageElement.width,
      height: imageElement.height,
      declaredWidth: Number(imageElement.getAttribute('width')),
      declaredHeight: Number(imageElement.getAttribute('height')),
      naturalWidth: imageElement.naturalWidth,
      naturalHeight: imageElement.naturalHeight,
      renderedWidth: bounds.width,
      renderedHeight: bounds.height,
      objectFit: getComputedStyle(imageElement).objectFit,
    };
  });
  const source = new URL(dimensions.currentSource);
  expect(source.pathname).toBe('/_next/image');
  if (expectedSource) expect(source.searchParams.get('url')).toBe(expectedSource);
  expect(dimensions.declaredWidth).toBeGreaterThan(0);
  expect(dimensions.declaredHeight).toBeGreaterThan(0);
  expect(dimensions.renderedWidth).toBeGreaterThan(0);
  expect(dimensions.renderedHeight).toBeGreaterThan(0);
  const originalRatio = dimensions.declaredWidth / dimensions.declaredHeight;
  expect(Math.abs(dimensions.naturalWidth / dimensions.naturalHeight / originalRatio - 1)).toBeLessThan(0.015);
  expect(Math.abs(dimensions.renderedWidth / dimensions.renderedHeight / originalRatio - 1)).toBeLessThan(0.015);
  expect(dimensions.objectFit).toBe('contain');
}

async function expectNoPlaceholders(page: Page) {
  await expect(page.locator('main .placeholder')).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText(/Imagem a integrar|Fotografia a integrar|Fotografia pendente|imagem pendente|aguardam os arquivos/i);
}

test('SOLARTE identifica o site e a Home apresenta o acervo e o ateliê', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('header')).toContainText('SOLARTE');
  await expect(page.locator('header')).toContainText('Dário Silva · Artista Plástico');
  await expect(page.locator('footer')).toContainText('SOLARTE');

  const title = page.getByRole('heading', { level: 1 });
  await expect(title).toContainText('DÁRIO SILVA');
  const fontSize = await title.evaluate(element => Number.parseFloat(getComputedStyle(element).fontSize));
  const mobile = (page.viewportSize()?.width ?? 0) === 375;
  expect(fontSize).toBeGreaterThanOrEqual(mobile ? 36 : 56);
  expect(fontSize).toBeLessThanOrEqual(mobile ? 48 : 80);

  await expect(page.getByRole('heading', { name: 'Obras selecionadas', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'O Ateliê', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: /Conheça o artista/i })).toBeVisible();
  await expect(page.locator('main').getByRole('link', { name: /acervo completo|todas as obras/i }).first()).toBeVisible();

  const favicon = page.locator('link[rel="icon"]').first();
  const faviconUrl = await favicon.getAttribute('href');
  expect(faviconUrl).toBeTruthy();
  const response = await page.request.get(faviconUrl!);
  expect(response.ok()).toBe(true);
});

test('Home exibe a pintura escolhida, a seleção real, o retrato e o ateliê sem recortar imagens', async ({ page }) => {
  await page.goto('/');
  await expectNoPlaceholders(page);
  const hero = getArtwork(curation.hero);
  expect(hero?.image).toBeTruthy();
  await expectRealImage(page.locator('.hero-art img'), hero!.image!.src);
  const selected = page.locator('#selecao .gallery-grid img');
  await expect(selected).toHaveCount(curation.selected.length);
  for (const [index, slug] of curation.selected.entries()) {
    const artwork = getArtwork(slug);
    expect(artwork?.image).toBeTruthy();
    await expectRealImage(selected.nth(index), artwork!.image!.src);
  }
  expect(artist.homePortrait).toBeTruthy();
  expect(artist.studio).toBeTruthy();
  await expectRealImage(page.locator('.home-artist figure img'), artist.homePortrait!.src);
  await expectRealImage(page.locator('.studio figure img'), artist.studio!.src);
});

test('cada pintura real carrega no acervo e em sua ficha, com proporções e campos sem informações inventadas', async ({ page }) => {
  await page.goto('/obras');
  await expectNoPlaceholders(page);
  const galleryImages = page.locator('.gallery-grid img');
  await expect(galleryImages).toHaveCount(artworks.length);
  for (const [index, artwork] of artworks.entries()) {
    expect(artwork.image).toBeTruthy();
    await expectRealImage(galleryImages.nth(index), artwork.image!.src);
  }
  for (const artwork of artworks) {
    await page.goto(`/obras/${artwork.slug}`);
    await expectNoPlaceholders(page);
    await expectRealImage(page.locator('.artwork-detail img'), artwork.image!.src);
    for (const [index, detail] of (artwork.details ?? []).entries()) {
      await expectRealImage(page.locator('.artwork-detail-image').nth(index).getByRole('button').locator('img'), detail.src);
    }
    for (const field of ['Ano', 'Técnica', 'Dimensões']) {
      const value = page.locator('main dl > div').filter({ has: page.getByText(field, { exact: true }) }).locator('dd');
      await expect(value).toHaveText('A confirmar');
    }
  }
});

test('toda a navegação funciona e o menu móvel fecha após a escolha', async ({ page }) => {
  await page.goto('/');
  for (const { label, route } of navigation) {
    const nav = await openNavigation(page);
    await nav.getByRole('link', { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${route}$`));
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(nav.getByRole('link', { name: label, exact: true, includeHidden: true })).toHaveAttribute('aria-current', 'page');
    const menu = page.locator('header').getByRole('button', { name: /menu|fechar/i });
    if (await menu.isVisible()) {
      await expect(menu).toHaveAttribute('aria-expanded', 'false');
      await expect(nav).not.toBeVisible();
    }
  }
  await page.locator('header').getByRole('link', { name: /SOLARTE/ }).click();
  await expect(page).toHaveURL('/');
});

test('biografia familiar e trajetória apresentam os fatos fornecidos como provisórios', async ({ page }) => {
  await page.goto('/o-artista');
  await expect(page.getByRole('heading', { name: 'A arte como expressão de uma vida', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Formação e trajetória', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Linguagens artísticas', exact: true })).toBeVisible();
  const main = page.locator('main');
  await expect(main).toContainText('Rio de Janeiro');
  await expect(main).toContainText('Escola de Belas Artes');
  await expect(main).toContainText('Faculdade de Educação do Rio de Janeiro');
  await expect(main).toContainText(/provisóri[oa]/i);
  await expect(main).toContainText(/revisão da família|revisad[oa] pela família/i);

  await page.goto('/trajetoria');
  for (const master of ['Jordão de Oliveira', 'Carlos Del Negro', 'Edson Motta', 'Abelardo Zaluar', 'Quirino Campofiorito', 'Mário Barata']) {
    await expect(page.locator('main')).toContainText(master);
  }
  await expect(page.locator('main')).toContainText(/família/i);
});

test('retratos reais e registro fotográfico acompanham a biografia e a ampliação devolve o foco', async ({ page }) => {
  await page.goto('/o-artista');
  await expectNoPlaceholders(page);
  expect(artist.portraits.length).toBeGreaterThanOrEqual(2);
  const portraitImages = page.locator('.artist-layout figure img, .complementary-portraits figure img');
  await expect(portraitImages).toHaveCount(artist.portraits.length);
  for (const [index, portrait] of artist.portraits.entries()) {
    await expectRealImage(portraitImages.nth(index), portrait.src);
  }

  const opener = page.getByRole('button', { name: 'Ampliar registro fotográfico', exact: true });
  await expect(opener).toBeVisible();
  await expectRealImage(opener.locator('img'));
  await opener.click();
  const dialog = page.getByRole('dialog', { name: 'Registro fotográfico', exact: true });
  await expect(dialog).toBeVisible();
  await expectRealImage(dialog.locator('img'));
  const close = dialog.getByRole('button', { name: 'Fechar ampliação', exact: true });
  const original = dialog.getByRole('link', { name: 'Abrir arquivo original ↗', exact: true });
  await expect(close).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(original).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(close).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(original).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(close).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
  await opener.click();
  await close.click();
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
});

test('lightbox mantém o foco no diálogo e Escape devolve o foco à obra', async ({ page }) => {
  await page.goto('/obras');
  const opener = page.getByRole('button', { name: /^Ampliar / }).first();
  await opener.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAccessibleName(/\S/);
  await expectRealImage(dialog.locator('img'), artworks[0].image!.src);
  const close = dialog.getByRole('button', { name: 'Fechar ampliação' });
  const detail = dialog.getByRole('link', { name: /Ver ficha da obra/ });
  await expect(close).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(detail).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(close).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
});

test('lightbox fecha pelo botão e pelo fundo e permite abrir a ficha da obra', async ({ page }) => {
  await page.goto('/obras');
  const opener = page.getByRole('button', { name: /^Ampliar / }).first();
  const dialog = page.getByRole('dialog');
  await opener.click();
  await dialog.getByRole('button', { name: 'Fechar ampliação' }).click();
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();

  await opener.click();
  const bounds = await dialog.boundingBox();
  expect(bounds).not.toBeNull();
  const viewport = page.viewportSize()!;
  await page.mouse.click(1, Math.min(viewport.height - 1, bounds!.y + bounds!.height / 2));
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();

  await opener.click();
  const title = await dialog.getByRole('heading', { level: 2 }).innerText();
  const link = dialog.getByRole('link', { name: /Ver ficha da obra/ });
  const route = await link.getAttribute('href');
  expect(route).toMatch(/^\/obras\/[^/]+$/);
  await link.click();
  await expect(page).toHaveURL(route!);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
  await expect(page.locator('main dl')).toContainText('Ano');
  await expect(page.locator('main dl')).toContainText('Técnica');
  await expect(page.locator('main dl')).toContainText('Dimensões');

  const response = await page.goto('/obras/inexistente');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Página não encontrada');
});

test('páginas não têm rolagem horizontal e redes sociais preservam segurança', async ({ page }) => {
  await page.goto('/obras');
  const artworkRoutes = await page.locator('main figure a[href^="/obras/"]').evaluateAll(links =>
    links.map(link => link.getAttribute('href')).filter((href): href is string => Boolean(href)),
  );
  expect(artworkRoutes.length).toBeGreaterThan(0);
  const routes = new Set(['/', '/obras', ...artworkRoutes, '/o-artista', '/trajetoria', '/contato', '/obras/inexistente']);
  for (const route of routes) {
    await page.goto(route);
    const dimensions = await page.evaluate(() => ({
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }));
    expect(dimensions.document, `largura do documento em ${route}`).toBeLessThanOrEqual(dimensions.viewport);
    expect(dimensions.body, `largura do corpo em ${route}`).toBeLessThanOrEqual(dimensions.viewport);
  }
  const socialLinks = page.locator('footer a[target="_blank"]');
  await expect(socialLinks).toHaveCount(2);
  for (const link of await socialLinks.all()) {
    const relation = await link.getAttribute('rel');
    expect(relation).toMatch(/noopener/);
    expect(relation).toMatch(/noreferrer/);
    expect(await link.getAttribute('href')).toMatch(/^https:\/\/(www\.)?(instagram|facebook)\.com\//);
  }
});
