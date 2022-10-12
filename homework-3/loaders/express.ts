
import express from 'express'
import router from '../routers';

export default function (app: express.Application): void {
    app.use(express.json());
    app.use('/users', router.userRouter)
    app.use('/groups', router.groupRouter);
}