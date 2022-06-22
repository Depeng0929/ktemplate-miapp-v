import { createSSRApp } from 'vue'
import App from './App.vue'

import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'

export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
  }
}
