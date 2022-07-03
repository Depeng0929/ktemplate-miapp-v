import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import '~/styles/index.scss'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()

  app.use(pinia)

  return {
    app,
  }
}
