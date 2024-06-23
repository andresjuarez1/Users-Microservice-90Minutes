// MembershipEntity.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize, initialize } from '../../../database/mysqldb';

class MembershipEntity extends Model {
    public uuid!: string;
    public user!: string;
    public startDate!: Date;
    public endDate!: string;
    public vigent!: string;
    public type!: string;
    public amount!: number;
    public nextMembership?: string;
    
}

async function initializeModel() {
    await initialize(); 
    if (!sequelize) {
        throw new Error('Sequelize no está inicializado');
    }

    MembershipEntity.init(
        {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            user: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            startDate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            endDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            vigent: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            amount: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            nextMembership: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'Membership',
        }
    );

    await MembershipEntity.sync({ force: false }).then(() => {
        console.log('Tabla MembershipEntity sincronizada');
    }).catch(error => {
        console.error('Error al sincronizar el modelo MembershipEntity:', error);
    });
}

initializeModel().catch(error => {
    console.error('Error initializing model:', error);
    process.exit(1); 
});



export default MembershipEntity;
