import 'reflect-metadata';
import express from 'express';

import initLoaders from './loaders';

import config from "./config/env";

// const app = express()
// sequelizeInstance.sync({ force: true }).then(() => {
//     console.log('connected success!!!');
//     }).catch((err) => {
//     console.log(err);
//     });
// app.listen(config.app.port, () => {
//     console.log(`Server is listening on port ${config.app.port}`)
// })
// export { app };
const app = express();
    async function startServer(): Promise<void> {
      await initLoaders(app);
      app.listen(config.app.port, () => {
        console.log(`Server is ready and listening on port ${config.app.port}`);
      });
    }

export { app };
    