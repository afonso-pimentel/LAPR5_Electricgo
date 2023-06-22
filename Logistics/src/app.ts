import 'reflect-metadata'; // We need this in order to use @Decorators

import config from '../config';
import express from 'express';
import Logger from './loaders/logger';
import initializePassport from './api/passportGoogle';
async function startServer() {
  const app = express();

  await require('./loaders').default({ expressApp: app });

  //Add Passport authentication
  initializePassport(app);

  app
    .listen(config.port, () => {
      console.log('Server listening on port: ' + config.port);

      Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
              Run your webservice calls at:
            http://localhost:${config.port}/api/
      ################################################
    `);
    })
    .on('error', err => {
      Logger.error(err);
      process.exit(1);
      return;
    });
}

startServer();
