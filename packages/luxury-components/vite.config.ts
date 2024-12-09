import { defineConfig } from 'vite'
import { resolve } from "path"
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import unocss from 'unocss/vite'
import Icons from 'unplugin-icons/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    unocss(),
    Icons({
      compiler: 'vue3',
    }),
    dts({ rollupTypes: true, include: ['src'] })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: 'main',
      formats: ['es', 'cjs'],
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
    }
  },
})
