import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import cors from 'cors';
import os from 'os';
import pkg from 'pg';

const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app  = express();
const PORT = process.env.PORT || 40000;
const HOST = process.env.HOST || '0.0.0.0';

/* DB config via env (set in PM2)
   PGWRITE_HOST: 192.168.230.203   // primary
   PGREAD_HOST : 127.0.0.1         // local replica on each web node
   PG_DATABASE : simple
   PG_USER     : simpleuser        // or postgres
   PG_PASSWORD : CHANGE_ME
   PG_PORT     : 5432
*/
const common = {
  port: +(process.env.PG_PORT || 5432),
  database: process.env.PG_DATABASE || 'simple',
  user: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || '',
  ssl: false,
  max: 5,
  idleTimeoutMillis: 30000,
};
const writePool = new Pool({ host: process.env.PGWRITE_HOST || '192.168.230.203', ...common });
const readPool  = new Pool({ host: process.env.PGREAD_HOST  || '127.0.0.1',       ...common });

app.use(morgan('tiny'));
app.use(cors());

// increments on PRIMARY, reads from LOCAL replica
app.get('/api/getMessage', async (req, res) => {
  try {
    await writePool.query('UPDATE "TableCount" SET "count" = "count" + 1');
    const { rows } = await readPool.query('SELECT "count" FROM "TableCount" LIMIT 1');
    const current = Number(rows?.[0]?.count ?? 0);

    res.json({
      message: 'Andrew Ton',
      hostname: os.hostname(),
      serverIp: req.socket?.localAddress || '',
      count: current
    });
  } catch (err) {
    console.error('getMessage error:', err);
    res.status(500).json({ error: 'db_error' });
  }
});

app.get('/healthz', (_req, res) => res.status(200).send('ok'));

const distDir = path.resolve(__dirname, '../my-app/dist');
app.use(express.static(distDir));
app.get('*', (_req, res) => res.sendFile(path.join(distDir, 'index.html')));

app.listen(PORT, HOST, () => {
  console.log(`vsinglesclubweb listening on http://${HOST}:${PORT}`);
});

