import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { Signale } from 'signale';

dotenv.config();

const signale = new Signale();

let sequelize: Sequelize | null = null;

async function initializeSequelize(): Promise<Sequelize> {
    const credentials = {
        name: process.env.DB_DATABASE ||
            'user_management',
        user: process.env.DB_USER
            || 'root',
        password: process.env.DB_PASSWORD
            || 'root', 
        host: process.env.DB_HOST
            || 'localhost'
    };

    const sequelizeInstance = new Sequelize(credentials.name, credentials.user, credentials.password, {
        host: credentials.host,
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        logging: false
    });

    
    try {
        await sequelizeInstance.authenticate();
        signale.success('Conexión a la base de datos exitosa');
    } catch (error) {
        signale.error('Error al conectar a la base de datos:', error);
        throw error;
    }

    return sequelizeInstance;
}

async function initialize() {
    if (!sequelize) {
        sequelize = await initializeSequelize();
    }
}

initialize().catch(error => {
    signale.error('Error initializing Sequelize:', error);
    process.exit(1); // Terminar el proceso si la inicialización falla
});

export { sequelize, initialize };
