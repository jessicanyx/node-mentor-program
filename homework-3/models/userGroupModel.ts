import { Column, Model, Table, BelongsToMany, ForeignKey } from 'sequelize-typescript';
import { Users } from './userModel';
import { Groups } from './groupModel';
@Table
class UserGroup extends Model {
  @ForeignKey(() => Users)
  userId!: string

  @ForeignKey(() => Groups)
  groupId!: string
}

export {UserGroup}