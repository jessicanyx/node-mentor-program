import { Column, PrimaryKey, Model, Table } from 'sequelize-typescript';
import { Permission } from '../interfaces/groupInterface';

@Table({ freezeTableName: true })
export class Groups extends Model {

  @PrimaryKey
  @Column
  id!: string

  @Column
  name!: string

  @Column
  permissions!: Array<Permission>

}