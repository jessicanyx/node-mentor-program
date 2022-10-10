import express from "express";
import sequelizeInstance from './loaders/postgres';

import config from "./config";

const app = express()
sequelizeInstance.sync({ force: true }).then(() => {
    console.log('connected success!!!');
    }).catch((err) => {
    console.log(err);
    });
app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`)
})
export { app };