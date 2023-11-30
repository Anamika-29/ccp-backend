import express from "express";
import { fileURLToPath } from 'url';
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import statusMonitor from 'express-status-monitor';
import Route from './routes/Routes.mjs';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

import('./database/db.js').then((module) => {
  const Connection = module.default;

  const app = express();

  // app.use(express.static(path.join(__dirname, '/build')));
  // app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, '/build', 'index.html'));
  // });

  app.use(cors());
  app.use(statusMonitor());
  app.use(bodyParser.json({ extended: true }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api/events", Route);

  app.use('/', Route);

  const port = 8000;

  Connection();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
