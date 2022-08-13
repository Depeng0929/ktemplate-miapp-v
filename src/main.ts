import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import App from './App.vue'

import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
import 'virtual:windi-devtools'

export function createApp() {
  const app = createSSRApp(App)

  app.use(Pinia.createPinia())

  return {
    app,
    Pinia,
  }
}
