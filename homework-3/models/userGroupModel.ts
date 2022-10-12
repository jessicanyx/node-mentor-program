import { Column, Model, Table, BelongsToMany, ForeignKey } from 'sequelize-typescript';

@Table
({ freezeTableName: true })
class Users extends Model {
  @BelongsToMany(() => Groups, () => UserGroup)
  group: Groups[]
}

@Table
({ freezeTableName: true })
class Groups extends Model {
  @BelongsToMany(() => Users, () => UserGroup)
  users: Users[]
}

@Table
({ freezeTableName: true })
export class UserGroup extends Model {
  @ForeignKey(() => Users)
  @Column
  userId!: string

  @ForeignKey(() => Groups)
  @Column
  groupId!: string
}