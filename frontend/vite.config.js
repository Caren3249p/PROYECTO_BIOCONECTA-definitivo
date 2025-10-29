import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Update these paths if your certs are elsewhere
const certPath = 'C:/Users/juans/OneDrive/Escritorio/cert.crt';
const keyPath = 'C:/Users/juans/OneDrive/Escritorio/cert.key';

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'Biotec.ptu.com',
    port: 443, // Puerto HTTPS estándar
    https: {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    },
  },
});
