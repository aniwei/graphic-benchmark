/*
 * @Author: Aniwei
 * @Date: 2022-10-17 19:30:52
 */
import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, './src/lib'),
      '@benchmarks': path.resolve(__dirname, './src/benchmarks'),
      '@components': path.resolve(__dirname, './src/components')
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  }
})
