import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
import 'virtual:windi-devtools'

import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)

  app.use(Pinia.createPinia())

  return {
    app,
    Pinia,
  }
}
