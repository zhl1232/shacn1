import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
        propsDestructure: true
      }
    }),
    Components({
      dts: 'src/components.d.ts',
      extensions: ['vue'],
      resolvers: [
        {
          type: 'component',
          resolve: (name) => {
            if (name.startsWith('Ys')) {
              const componentName = name
                .slice(2)
                .replace(/([A-Z])/g, '-$1')
                .toLowerCase()
                .replace(/^-/, '');
              return {
                name: 'default',
                from: `@ys/components/composite/${componentName}`
              };
            }
          }
        }
      ],
      directoryAsNamespace: false,
      deep: true
    }),
    AutoImport({
      imports: [
        'vue',
        {
          '@iconify/vue': ['Icon']
        }
      ],
      dts: true
    })
  ],
  resolve: {
    alias: {
      '@ys/components': path.resolve(__dirname, '../../packages/components/src'),
      '@ys/components/composite': path.resolve(
        __dirname,
        '../../packages/components/src/composite'
      )
    }
  }
})
