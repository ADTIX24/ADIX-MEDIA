import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

const configFilePath = path.resolve(__dirname, 'savedConfig.json');

function configStoragePlugin(): Plugin {
  const handler = (req: any, res: any, next: any) => {
    if (req.url && req.url.startsWith('/api/config')) {
      if (req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        try {
          if (fs.existsSync(configFilePath)) {
            const data = fs.readFileSync(configFilePath, 'utf-8');
            if (data && data.trim().length > 2) {
              res.statusCode = 200;
              res.end(data);
              return;
            }
          }
        } catch (err) {
          console.error('Error reading server config:', err);
        }
        res.statusCode = 200;
        res.end(JSON.stringify({ empty: true }));
        return;
      }

      if (req.method === 'POST') {
        let body = '';
        req.on('data', (chunk: any) => {
          body += chunk;
        });
        req.on('end', () => {
          try {
            const parsed = JSON.parse(body);
            fs.writeFileSync(configFilePath, JSON.stringify(parsed, null, 2), 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true }));
          } catch (err: any) {
            console.error('Error writing server config:', err);
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: err?.message || 'Server write error' }));
          }
        });
        return;
      }
    }
    next();
  };

  return {
    name: 'config-storage-plugin',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), configStoragePlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: {
        ignored: ['**/savedConfig.json', '**/src/data/savedConfig.json'],
      },
    },
  };
});
