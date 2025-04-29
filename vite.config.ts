import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
server: {
  proxy:{
    '/api': {
      target: 'https://squid-app-qgori.ondigitalocean.app/',
      changeOrigin: true,
      secure: false,
      rewrite: (path) => path.replace(/^\/api/, ''),
      
        
  },

},
}, 
  
  plugins: [react(),tailwindcss()],
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
  
});