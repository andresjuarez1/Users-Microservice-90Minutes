import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../database/mysqldb';

class UserEntity extends Model {
    public uuid!: string;
    public token!: string;
    public verifiedAt!: Date;
    public email!: string;
    public password!: string;
    public name!: string;
    public lastName!: string;
    public phoneNumber!: string;
}

UserEntity.init(
    {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        verifiedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
    }
);

export default UserEntity;
