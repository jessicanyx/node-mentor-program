import { Service } from "typedi";
import { Op } from "sequelize";

import { Users } from "../models/user";
// import { IUserInputDTO, IUser } from "../interfaces/user";

@Service()

export class UserService {
    createUser(data: Users): Promise<Users> {
        const { login, password, age } = data
        return Users.create({ login, password, age });
    }

    getUsersList(loginSubstring: string, limit: number): Promise<Array<Users>> {
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

    getUserById(id:number): Promise<Users> {
        return Users.findByPk(id);
    }

    deleteUserById(id:number) :Promise<[number]> {
        return Users.update({
            isDelete: true
        }, {
            where: {
                id,
                isDeleted: false,
            }
        })
    }

    updateUserById(id:number, data: Users): Promise<any> {
        const {login, password, age} = data;
        return Users.update({
            login, password, age,
        }, {
            where: {
                id,
                isDeleted: false,
            },
            returning: true,
        })
    }

}


