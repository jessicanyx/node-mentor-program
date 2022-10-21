import { Sequelize } from 'sequelize-typescript';
import { Users } from '../models/userModel';
import { Groups } from '../models/groupModel';
import {UserGroup} from '../models/userGroupModel';
import { Permissions } from '../models/permissionModel';

import config from '../config/env';

  const sequelizeInstance = new Sequelize({
    host: config.db.host,
    port: config.db.port,
    database: config.db.name,
    username: config.db.user,
    password: config.db.password,
    dialect: 'postgres',
  });
  sequelizeInstance.addModels([Users, Groups, UserGroup, Permissions]);

export default sequelizeInstance