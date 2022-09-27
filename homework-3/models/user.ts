import { DataTypes, Model, Sequelize } from "sequelize";


export class UserModel extends Model {
    public id!: number;
    public login!: string;
    public password!: string;
    public age!: number;
    public isDeleted!: boolean
}

export default function (sequelize: Sequelize): void {
    UserModel.init({
        id: {
            type: DataTypes.NUMBER,
            primaryKey: true,
            autoIncrement: true,
        },
        login: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        age: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }, {
        sequelize,
        timestamps: false,
        tableName: 'users',
    })
}