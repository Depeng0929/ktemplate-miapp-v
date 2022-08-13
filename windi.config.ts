import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  prefixer: false,
  preflight: false,
  extract: {
    exclude: ['node_modules', '.git', 'dist'],
  },
  shortcuts: {
    'border-base': 'border-gray-200',
    'bg-base': 'bg-white',
    'color-base': 'text-gray-900',
    'color-fade': 'text-gray-900:50',
  },
  theme: {
    extend: {
      colors: {
        blue: '#276EF1',
        black: {
          DEFAULT: '#161616',
          light: '#363636',
          pure: '#000000',
        },

      },
    },
  },
  corePlugins: {
    container: false,
  },
})
