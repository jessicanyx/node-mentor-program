import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/user';

import config from '../config';

  const sequelizeInstance = new Sequelize({
    host: config.database.host,
    port: config.database.port,
    database: config.database.name,
    username: config.database.user,
    password: config.database.password,
    dialect: 'postgres',
  });
  // sequelizeInstance.addModels([User]);

export default sequelizeInstance