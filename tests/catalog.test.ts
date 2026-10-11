import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { artworks, getArtwork, canDisplayImage } from '../data/artworks';
import { artist, artistBiography } from '../data/artist';
import { curation } from '../data/curation';
import inventory from '../data/image-inventory.json';

function imagePath(src: string) {
  assert.match(src, /^\/images\/[^/]+\.png$/);
  return join(process.cwd(), 'public', src);
}

function hash(contents: Buffer) {
  return createHash('sha256').update(contents).digest('hex');
}

function catalogImages() {
  return [
    ...artworks.map(artwork => {
      assert.ok(artwork.image, `a imagem de ${artwork.slug} precisa estar integrada`);
      return { ...artwork.image, source: artwork.source, permission: artwork.permission };
    }),
    ...artworks.flatMap(artwork => artwork.details ?? []),
    ...artist.portraits,
    artist.studio,
  ];
}

test('cada pintura possui ficha única, e todas as escolhas curatoriais apontam para pinturas reais', () => {
  assert.equal(artworks.length, 8);
  assert.equal(new Set(artworks.map(artwork => artwork.slug)).size, artworks.length);
  for (const artwork of artworks) assert.equal(getArtwork(artwork.slug), artwork);
  assert.equal(getArtwork('inexistente'), undefined);
  assert.ok(getArtwork(curation.hero)?.image);
  assert.equal(new Set(curation.selected).size, curation.selected.length);
  for (const slug of curation.selected) assert.ok(getArtwork(slug)?.image);
});

test('imagens somente são exibidas quando possuem procedência e autorização', () => {
  const artwork = { ...artworks[0], image: { src: '/obra.jpg', width: 800, height: 600, alt: 'Descrição da pintura' }, source: null, permission: null };
  assert.equal(canDisplayImage(artwork), false);
  assert.equal(canDisplayImage({ ...artwork, source: 'https://example.com/obra' }), false);
  assert.equal(canDisplayImage({ ...artwork, source: 'https://example.com/obra', permission: 'Autorização documentada do titular' }), true);
  for (const item of artworks) assert.equal(canDisplayImage(item), true);
});

test('as 13 imagens distintas possuem arquivo original, dimensões corretas, descrição e procedência', () => {
  const images = catalogImages();
  assert.equal(images.length, 13);
  assert.equal(new Set(images.map(image => image?.src)).size, 13);
  for (const image of images) {
    assert.ok(image);
    assert.ok(image.alt.trim(), `descrição alternativa ausente em ${image.src}`);
    assert.ok(image.source?.trim(), `procedência ausente em ${image.src}`);
    assert.ok(image.permission?.trim(), `autorização ausente em ${image.src}`);
    const record = inventory.images.find(item => `/images/${item.filename}` === image.src);
    assert.ok(record, `imagem ${image.src} precisa estar registrada no inventário`);
    assert.equal(image.source, `https://github.com/j98099779-dot/dario-silva-arte/blob/${inventory.uploadCommit}/public/images/${encodeURIComponent(record.originalFilename)}`);
    const contents = readFileSync(imagePath(image.src));
    assert.equal(contents.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `${image.src} deve ser uma imagem PNG válida`);
    assert.equal(contents.subarray(12, 16).toString(), 'IHDR');
    assert.equal(contents.readUInt32BE(16), image.width, `largura original de ${image.src}`);
    assert.equal(contents.readUInt32BE(20), image.height, `altura original de ${image.src}`);
  }
});

test('todas as imagens fornecidas permanecem intactas e cada arquivo distinto foi integrado uma vez', () => {
  assert.equal(inventory.fileCount, 14);
  assert.equal(inventory.uniqueImageCount, 13);
  assert.equal(inventory.images.length, 14);
  assert.equal(new Set(inventory.images.map(image => image.filename)).size, 14);
  const originalHashes = new Set(inventory.images.map(image => {
    assert.match(image.originalFilename, /^Captura de tela .*\.png$/);
    assert.equal(hash(readFileSync(imagePath(`/images/${image.filename}`))), image.sha256, `${image.filename} preserva o SHA-256 do arquivo fornecido`);
    return image.sha256;
  }));
  assert.equal(originalHashes.size, 13, 'um dos 14 arquivos enviados é uma duplicação exata');
  const displayedHashes = new Set(catalogImages().map(image => {
    assert.ok(image);
    return hash(readFileSync(imagePath(image.src)));
  }));
  assert.deepEqual(displayedHashes, originalHashes, 'arquivos integrados preservam todos os bytes das imagens fornecidas');
});

test('o recorte da pintura integra a ficha existente e os retratos não se tornam obras', () => {
  const details = artworks.flatMap(artwork => artwork.details ?? []);
  assert.equal(details.length, 1);
  assert.equal(artist.portraits.length, 3);
  assert.ok(artist.studio);
  assert.ok(artist.homePortrait);
  assert.ok(artist.archiveImage);
  assert.ok(artist.portraits.some(portrait => portrait.src === artist.homePortrait?.src));
  assert.equal(artist.archiveImage.src, artist.portraits[0].src);
  const paintingPaths = new Set(artworks.map(artwork => artwork.image?.src));
  for (const portrait of artist.portraits) assert.equal(paintingPaths.has(portrait.src), false);
  assert.equal(paintingPaths.has(artist.studio.src), false);
  assert.equal(paintingPaths.has(details[0].src), false);
});

test('metadados desconhecidos das obras continuam pendentes e a biografia familiar é preservada', () => {
  for (const artwork of artworks) {
    assert.equal(artwork.year, null);
    assert.equal(artwork.technique, null);
    assert.equal(artwork.dimensions, null);
    assert.ok(artwork.title.trim());
  }
  assert.equal(artistBiography.status, 'provisional');
  assert.match(artistBiography.sourceNote, /família/);
  assert.match(artist.biography ?? '', /Dário Silva nasceu no Rio de Janeiro/);
  assert.match(artist.biography ?? '', /Escola de Belas Artes/);
  assert.match(artist.biography ?? '', /Faculdade de Educação do Rio de Janeiro/);
  assert.match(artist.biography ?? '', /Jordão de Oliveira/);
});
