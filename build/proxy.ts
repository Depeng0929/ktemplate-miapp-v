export function createProxyServer() {
  return {
    watch: {
      usePolling: true,
    },
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  }
}
