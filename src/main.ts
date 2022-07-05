import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import App from './App.vue'

import '~/styles/index.scss'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'

export function createApp() {
  const app = createSSRApp(App)

  app.use(Pinia.createPinia())

  return {
    app,
    Pinia,
  }
}
