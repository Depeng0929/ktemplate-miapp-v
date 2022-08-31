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
    current: any
  }
}

declare module 'hex-and-rgba/esm/index.mjs' {
  export function hexToRgba(hex: string, opacity = 1): [number, number, number, number]
  export function isValidHex(hex: string): boolean
}

declare module 'uqrcodejs' {
  export default class QRCode {
    public data: string
    public size: number
    public canvasContext: CanvasContext

    constructor()
    make():void
    drawCanvas(): void
  }
}
