import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 40000;
const HOST = process.env.HOST || '0.0.0.0';

// logging + CORS for dev
app.use(morgan('tiny'));
app.use(cors());

// --- API ---
app.get('/api/getMessage', (req, res) => {
  res.json({ message: 'Andrew Ton' });
});

// health check for HAProxy
app.get('/healthz', (_req, res) => res.status(200).send('ok'));

// --- serve built FE ---
const distDir = path.resolve(__dirname, '../my-app/dist');
app.use(express.static(distDir));
// SPA fallback
app.get('*', (_req, res) => res.sendFile(path.join(distDir, 'index.html')));

app.listen(PORT, HOST, () => {
  console.log(`vsinglesclubweb listening on http://${HOST}:${PORT}`);
});

