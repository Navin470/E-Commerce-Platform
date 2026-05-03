// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
// })

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

import { defineConfig } from 'vite'; // This must be present
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 80,
  },
});

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   server: {
//     // 1. Allow Vite to accept connections from outside the container
//     host: '0.0.0.0',
//     port: 80,
    
//     // 2. Critical for WSL2: Enable polling to detect file changes correctly
//     watch: {
//       usePolling: true,
//     },
    
//     // 3. Match the HMR port to your Kubernetes NodePort (30007)
//     // This prevents the "Pending" websocket connection seen in image_5c3bc1.png
//     hmr: {
//       clientPort: 30007,
//     },
//   },
// })