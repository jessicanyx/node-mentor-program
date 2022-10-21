import { Column, PrimaryKey, Model, Table,DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Permission } from '../interfaces/groupInterface';
import { UserGroup } from './userGroupModel';
import { Users } from './userModel';
import { Permissions } from './permissionModel';
@Table
class Groups extends Model {

  @PrimaryKey
  @Column(DataType.STRING)
  id!: string

  @Column(DataType.STRING)
  name!: string

  @HasMany(() => Permissions)
  permissions!: Array<Permission>

  @BelongsToMany(() => Users, () => UserGroup)
  users: any[]

}

export {Groups}