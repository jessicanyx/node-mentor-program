import { Application } from 'express';
import sequelize from '../config/database';
import expressLoader from './express';
import './models';

export default async function (app: Application): Promise<void> {
  // await modelsLoader();
  try {
    await sequelize.authenticate();
  } catch (error) {
    throw new Error(`Unable to connect to the database: ${error}`);
  }

  // modelsLoader();
  expressLoader(app);
}