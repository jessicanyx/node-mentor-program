import { Column, PrimaryKey, Model, Table } from 'sequelize-typescript';

@Table({ freezeTableName: true })
export class Users extends Model {

  @PrimaryKey
  @Column
  id!: string

  @Column
  login!: string

  @Column
  password!: string

  @Column
  age!: number

  @Column
  isDeleted!: boolean

}