import { Sequelize } from 'sequelize-typescript';

import config from './env';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: config.db.host,
  port: config.db.port,
  database: config.db.name,
  username: config.db.user,
  password: config.db.password,

  define: {
    timestamps: false,
  },
});

export default sequelize;