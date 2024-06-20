// UserEntity.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize, initialize } from '../../../database/mysqldb';

class UserEntity extends Model {
    public uuid!: string;
    public token!: string;
    public verifiedAt!: Date;
    public email!: string;
    public password!: string;
    public name!: string;
    public lastName!: string;
    public phoneNumber!: string;
    public address!: string;
    public hasUsedPromotion!: boolean;
}

async function initializeModel() {
    await initialize(); // Asegurar que sequelize esté inicializado
    if (!sequelize) {
        throw new Error('Sequelize no está inicializado');
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
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            hasUsedPromotion: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'User',
        }
    );
}

initializeModel().catch(error => {
    console.error('Error initializing model:', error);
    process.exit(1); // Terminar el proceso si la inicialización falla
});

export default UserEntity;
