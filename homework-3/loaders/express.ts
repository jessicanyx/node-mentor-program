
import express from 'express'
import router from '../routers/user';

export default function (app: express.Application): void {
    app.use(express.json());
    app.use('/users', router)
}