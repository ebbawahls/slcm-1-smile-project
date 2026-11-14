import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createLogger } from './logger.js';

//Konfiguration (miljövariabler läses BARA här)
const PORT = process.env.PORT || 3000;
const APP_ENV = process.env.APP_ENV || 'development';
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

const logger = createLogger({ env: APP_ENV, level: LOG_LEVEL });

// Var React-appen ligger
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, '../../frontend/dist');

const app = express();

// Logga varje request
app.use((req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    logger.info('Request handled', {
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      durationMs: Date.now() - start,
    });
  });

  next();
});

// Health check
app.get('/health', (req, res) => {
  logger.debug('Health check called');

  res.json({
    status: 'ok',
    environment: APP_ENV,
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// Medvetet fel
app.get('/error-test', () => {
  throw new Error('This is a test error');
});

// Servera React-appen
app.use(express.static(distPath));

// Fallback
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// felhantering
app.use((err, req, res, next) => {
  logger.error('Unhandled error', {
    method: req.method,
    path: req.originalUrl,
    message: err.message,
    stack: err.stack,
  });

  res.status(500).json({ error: 'Internal Server Error' });
});

// Starta servern
const server = app.listen(PORT, '0.0.0.0', () => {
  logger.info('Server started', { port: PORT, logLevel: logger.level });
});

// Stäng snyggt när Render startar om
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down');

  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });

  server.closeIdleConnections();

  setTimeout(() => {
    logger.warn('Forcing open connections to close');
    server.closeAllConnections();
  }, 3000).unref();
});
