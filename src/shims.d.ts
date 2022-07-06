declare module '*.vue' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    VITE_APP_API: string
  }
}

declare interface MinappEvent {
  detail: {
    value: any
  }
}
