import path from 'path';
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import tailwindConfig from './tailwind.config';

export default defineConfig(({ mode }) => {
  const rootDir = path.resolve(__dirname, 'src');
  const env = loadEnv(mode, process.cwd(), '');
  const production = env.NODE_ENV === 'production';

  return {
    root: rootDir,
    base: '/',
    appType: 'spa',
    plugins: [
      vue(),
    ],
    css: {
      postcss: {
        plugins: [
          autoprefixer(),
          tailwind({
            config: { ...tailwindConfig },
          }),
        ],
      },
    },
    resolve: {
      alias: {
        '@': rootDir,
      }
    },
    build: {
      minify: production,
      sourcemap: production,
    },
  }
});
