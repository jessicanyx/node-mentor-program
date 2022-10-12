import { Application } from 'express';
import { Sequelize } from 'sequelize';

import postgresLoader from './postgres';
import expressLoader from './express';
import modelsLoader from './models';
import "reflect-metadata"

export default async function (app: Application): Promise<void> {
  const sequelizeInstance = await postgresLoader() as Sequelize;
  await modelsLoader(sequelizeInstance);
  expressLoader(app);
}