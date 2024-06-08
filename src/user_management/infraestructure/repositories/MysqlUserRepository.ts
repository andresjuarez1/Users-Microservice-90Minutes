import { UserInterface } from "../../domain/ports/UserInterface";
import { User } from "../../domain/entities/User";
import UserEntity from '../daos/UserEntity';
import { EncryptService } from "../../domain/services/EncriptServices";
import { TokenServices } from "../../domain/services/TokenServices";
import { UserDaoMapper } from '../mappers/UserDaoMapper';
import sequelize from "../../../database/mysqldb";

export class MysqlUserRepository implements UserInterface {
    private async withTransaction(callback: (transaction: any) => Promise<any>): Promise<any> {
        const transaction = await sequelize.transaction();
        try {
            const result = await callback(transaction);
            await transaction.commit();
            return result;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async findByEmail(email: string, transaction?: any): Promise<User | null> {
        try {
            return await UserEntity.findOne({ where: { email }, transaction })
                .then(userEntity => userEntity ? UserDaoMapper.toDomain(userEntity) : null);
        } catch (error) {
            console.error('Error finding user by email:', error);
            return null;
        }
    }


     async findByUUID(uuid: string, transaction?: any): Promise<User | null> {
        try {
            return await UserEntity.findByPk(uuid, { transaction })
                .then(userEntity => userEntity ? UserDaoMapper.toDomain(userEntity) : null);
        } catch (error) {
            console.error('Error finding user by UUID:', error);
            return null;
        }
    }

    async delete(uuid: string, transaction?: any): Promise<boolean> {
        try {
            await UserEntity.destroy({ where: { uuid }, transaction });
            return true;
        } catch (error) {
            console.error('Error deleting user:', error);
            return false;
        }
    }

    async update(uuid: string, user: User, transaction?: any): Promise<User | null> {
        try {
            return await this.withTransaction(async (transaction: any) => {
                const userEntity = UserDaoMapper.toEntity(user);
                await UserEntity.update(userEntity, { where: { uuid }, transaction });
                return user;
            });
        } catch (error) {
            console.error('Error updating user:', error);
            return null;
        }
    }


    async list(transaction?: any): Promise<User[] | null> {
        try {
            const userEntities = await UserEntity.findAll({ transaction });
            return userEntities.map(userEntity => UserDaoMapper.toDomain(userEntity));
        } catch (error) {
            console.error('Error listing users:', error);
            return null;
        }
    }

    async updateUserVerifiedAt(uuid: string, transaction?: any): Promise<boolean> {
        try {
            return await this.withTransaction(async (transaction: any) => {
                await UserEntity.update({ verifiedAt: new Date() }, { where: { uuid }, transaction });
                return true;
            });
        } catch (error) {
            console.error('Error updating user verified at:', error);
            return false;
        }
    }

    async sign_up(user: User): Promise<User | null> {
        try {
            return await this.withTransaction(async (transaction: any) => {
                const userEntity = UserDaoMapper.toEntity(user);
                await userEntity.save({ transaction });
                return user;
            });
        } catch (error) {
            console.error('Error creating user:', error);
            return null;
        }
    }

    async sign_in(email: string, password: string, encryptionService: EncryptService, tokenServices: TokenServices): Promise<User | null> {
        try {
            return await this.withTransaction(async (transaction: any) => {
                let user = await this.findByEmail(email, transaction);
                console.log(user);
                if (!user) return null;
                if (await encryptionService.compare(password, user.credentials.password)) {
                    user.status.token = await tokenServices.generateToken();
                    console.log(user.status.token);
                    await UserEntity.update({ token: user.status.token }, { where: { uuid: user.uuid }, transaction });
                    return user;
                } else {
                    return null;
                }
            });
        } catch (error) {
            console.error('Error signing in:', error);
            return null;
        }
    }

    async sign_out(uuid: string, transaction?: any): Promise<boolean> {
        try {
            return await this.withTransaction(async (transaction: any) => {
                await UserEntity.update({ token: '' }, { where: { uuid }, transaction });
                return true;
            });
        } catch (error) {
            console.error('Error signing out:', error);
            return false;
        }
    }
}
