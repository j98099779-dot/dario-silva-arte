import { test } from 'node:test';
import assert from 'node:assert/strict';
import { artworks, getArtwork, canDisplayImage } from '../data/artworks';
test('cada ficha tem endereço único e pode ser localizada', () => { assert.equal(new Set(artworks.map(a => a.slug)).size, artworks.length); for (const artwork of artworks) assert.equal(getArtwork(artwork.slug), artwork); assert.equal(getArtwork('inexistente'), undefined); });
test('uma imagem não é exibida sem procedência e autorização', () => { const artwork = { ...artworks[0], image: { src: '/obra.jpg', width: 800, height: 600, alt: 'Descrição da pintura' } }; assert.equal(canDisplayImage(artwork), false); assert.equal(canDisplayImage({ ...artwork, source: 'https://example.com/obra' }), false); assert.equal(canDisplayImage({ ...artwork, source: 'https://example.com/obra', permission: 'Autorização documentada do titular' }), true); });
test('registros provisórios não inventam imagens ou informações', () => { for (const artwork of artworks) { assert.equal(artwork.image, null); assert.equal(artwork.year, null); assert.equal(artwork.technique, null); assert.equal(artwork.dimensions, null); } });
