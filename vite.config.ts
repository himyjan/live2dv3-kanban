import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      '@framework': resolve(__dirname, 'src/live2d/Framework/src'),
      '@L2DApp': resolve(__dirname, 'src/live2d/lapp'),
    },
  },
  server: {
    port: 5000,
    host: '0.0.0.0',
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './src/custom/init.js',
      output: {
        entryFileNames: 'l2dkanban.js',
        dir: 'dist',
      },
    },
    minify: false,
  },
});
