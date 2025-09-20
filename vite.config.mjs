import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    build: {
        lib: {
            name: 'hashcat-reverse-rules',
            entry: path.resolve(__dirname, 'index.js'),
            fileName: `hashcat-reverse-rules`,
            formats: ['cjs']
        },
        rollupOptions: {
            external: [],
        }
    },
    resolve: {
    }
});
