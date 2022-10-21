import { Column, PrimaryKey, Model, Table, DataType, BelongsToMany } from 'sequelize-typescript';
import { Groups } from './groupModel';
import { UserGroup } from './userGroupModel';

@Table({ freezeTableName: true })
class Users extends Model {

  @PrimaryKey
  @Column(DataType.STRING)
  id!: string

  @Column(DataType.STRING)
  login!: string

  @Column(DataType.STRING)
  password!: string

  @Column(DataType.INTEGER)
  age!: number

  @Column(DataType.BOOLEAN)
  isDeleted!: boolean

  @BelongsToMany(() => Groups, ()=> UserGroup)
  group: any[]
}

export {Users}