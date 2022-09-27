import express from "express";

import initLoader from './loaders'
import config from "./config";

async function startServer() {
    const app = express()
    await initLoader(app)
    app.listen(config.port, () => {
        console.log(`Server is listening on port ${config.port}`)
    })
}

startServer()