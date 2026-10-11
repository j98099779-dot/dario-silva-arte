import { test, expect, type Page } from '@playwright/test';

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

test('lightbox mantém o foco no diálogo e Escape devolve o foco à obra', async ({ page }) => {
  await page.goto('/obras');
  const opener = page.getByRole('button', { name: /^Ampliar / }).first();
  await opener.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAccessibleName(/\S/);
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
