import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const root = dirname(fileURLToPath(import.meta.url));

// The source imports sibling packages with relative paths (e.g. '../gluonjs/gluon.js'),
// because the published file lives next to them inside node_modules.
const isSiblingImport = (id) => id.startsWith('../');

// In development, resolve those sibling imports as bare package imports
// from node_modules, so they share module instances with the dependencies.
const siblingModules = {
  name: 'sibling-modules',
  apply: 'serve',
  resolveId(source, importer) {
    if (!importer || !isSiblingImport(source)) return null;
    if (existsSync(resolve(dirname(importer), source))) return null;
    const bare = source.slice(3);
    if (!existsSync(resolve(root, 'node_modules', bare))) return null;
    return this.resolve(bare, importer, { skipSelf: true });
  },
};

export default defineConfig({
  plugins: [siblingModules],
  build: {
    // The published entry point lives at the package root so its relative
    // sibling imports keep resolving inside a consumer's node_modules.
    outDir: '.',
    emptyOutDir: false,
    copyPublicDir: false,
    sourcemap: true,
    lib: {
      entry: 'src/overwebs-main-page.js',
      formats: ['es'],
      fileName: () => 'overwebs-main-page.js',
    },
    rollupOptions: {
      external: isSiblingImport,
      makeAbsoluteExternalsRelative: false,
      // Fully minify (including whitespace), like the previous uglify build.
      output: { minify: true },
    },
  },
});
