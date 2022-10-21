import { Permission } from "../interfaces/groupInterface";
import { Groups } from './groupModel';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

@Table
export class Permissions extends Model {
    @Column(DataType.STRING) 
    permission!: Permission

    @ForeignKey(() => Groups)
    groupId?: string

    @BelongsTo(() => Groups)
    group?: Groups
}