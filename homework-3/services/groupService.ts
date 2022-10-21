import { Service } from 'typedi';
import { v4 as uuidv4 } from 'uuid';

import { GroupInputDTO, Group } from '../interfaces/groupInterface';
import { Groups } from '../models/groupModel';
import { UserGroup } from '../models/userGroupModel';
import sequelize from '../config/database';
import { Users } from '../models/userModel';
import { UserGroupInputDTO } from '../interfaces/userGroupInterface';

@Service()
export class GroupsService {
  createGroup(data: GroupInputDTO): Promise<Group> {
    const { name, permissions } = data;
    const id = uuidv4();
    return Groups.create({ id, name, permissions });
  }

  getGroups(): Promise<Group[]> {
    return Groups.findAll();
  }

  getGroupById(id: string): Promise<Group> {
    return Groups.findByPk(id);
  }

  async updateGroupById(id: string, data: GroupInputDTO): Promise<Group | undefined> {
    const { name, permissions } = data;

    const group = await Groups.findByPk(id);

    if (!group) {
      return;
    }

    group.name = name;
    group.permissions = permissions;

    await group.save();

    return group;
  }

  async deleteGroupById(id: string): Promise<number | undefined> {
    const transaction = await sequelize.transaction();

    try {
      const groups = await Groups.destroy({
        where: {
          id,
        },
        transaction
      });

      await transaction.commit();
      return groups;
    } catch (error) {
      await transaction.rollback();
    }
  }

  async addUsersToGroup(groupId: string, data: UserGroupInputDTO): Promise<UserGroup[] | undefined> {
    const { userIds } = data;

    const transaction = await sequelize.transaction();

    const group = await Groups.findByPk(groupId, { transaction });

    if (!group) {
      return;
    }

    try {
      const users = await Users.findAll({
        where: {
          id: userIds,
          isDeleted: false,
        },
        transaction,
      });

      const relationId = uuidv4();
      const usersGroups = await UserGroup.bulkCreate(
        users.map((user: Users) => {
          return {
            id: relationId,
            userId: user.id,
            groupId: group.id,
          };
        }), {
          transaction,
        });

      await transaction.commit();
      return usersGroups;
    } catch (error) {
      console.log(error);
      await transaction.rollback();
    }
  }
}