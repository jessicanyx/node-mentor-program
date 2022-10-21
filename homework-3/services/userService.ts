import { Service } from 'typedi';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import { Users } from '../models/userModel';
import { IUserInputDTO } from '../interfaces/userInterface';

@Service()
export class UserService {
  createUser(data: IUserInputDTO): Promise<Users> {
    const { login, password, age } = data;
    const id = uuidv4();
    return Users.create({ id, login, password, age });
  }

  getUsersList(loginSubstring: string, limit: number): Promise<Users[]> {
    return Users.findAll({
      where: {
        login: {
          [Op.iLike]: `%${loginSubstring}%`,
        },
      },
      order: ['login'],
      limit,
    });
  }

  getUserById(id: string): Promise<Users> {
    return Users.findByPk(id);
  }

  deleteUserById(id: string): Promise<number> {
    return Users.update({
      isDeleted: true,
    }, {
      where: {
        id,
        isDeleted: false,
      },
    }).then(([numberOfUsers]: number[]) => numberOfUsers);
  }

  async updateUserById(id: string, data: IUserInputDTO): Promise<Users | undefined> {
    const { login, password, age } = data;

    const user = await Users.findByPk(id);

    if (!user) {
      return;
    }

    user.login = login;
    user.password = password;
    user.age = age;

    await user.save();

    return user;
  }
}