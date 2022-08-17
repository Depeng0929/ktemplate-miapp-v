import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  prefixer: false,
  preflight: false,
  extract: {
    exclude: ['node_modules', '.git', 'dist'],
  },
  shortcuts: {
    'bg-main': 'bg-white text-[#181818] dark:(bg-[#121212] text-[#ddd])',
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
