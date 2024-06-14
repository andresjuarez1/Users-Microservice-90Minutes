import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { Signale } from 'signale';

dotenv.config();

const signale = new Signale();

const sequelize = new Sequelize(process.env.DB_DATABASE || '', process.env.DB_USER || '', process.env.DB_PASSWORD || '', {
    host: process.env.DB_HOST || '',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
});

async function syncDatabase() {
    try {
        await sequelize.sync({ force: false });
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Unable to synchronize the database:', error);
    }
}

syncDatabase();

sequelize.authenticate()
    .then(() => signale.success('Conexion a la base de datos exitosa'))
    .catch((error) => signale.error('Error al conectar a la base de datos:', error));

export default sequelize;
