import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
server: {
  proxy:{
    '/api/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
      secure: false,
      //^/(education|work|users|portfolio)
        
  },

},
}, 
  plugins: [react(),tailwindcss()],
  
});