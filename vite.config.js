import 'dotenv/config';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
    plugins: [react()],
    root: path.resolve(__dirname, 'frontend'),
    server: {
        proxy: {
            '/api': {
                target: `http://localhost:${process.env.PORT}`,
                changeOrigin: true,
                secure: false,
                ws: true
            }
        }
    }
});
