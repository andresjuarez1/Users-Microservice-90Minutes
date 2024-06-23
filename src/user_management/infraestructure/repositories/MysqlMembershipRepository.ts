import { MembershipService } from "../../domain/ports/MembershipInterface";
import { User } from "../../domain/entities/User";
import MembershipEntity from '../daos/MembershipEntity';
import { EncryptService } from "../../domain/services/EncriptServices";
import { TokenServices } from "../../domain/services/TokenServices";
import { MembershipDaoMapper } from '../mappers/MembershipDaoMapper';
import { sequelize, initialize } from "../../../database/mysqldb";
import { Membership } from "../../domain/entities/Membership";


export class MysqlMembershipRepository implements MembershipService {
    private async withTransaction(callback: (transaction: any) => Promise<any>): Promise<any> {
        await initialize(); 
        if (!sequelize) {
            throw new Error('Sequelize no está inicializado');
        }
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
    
    async checkAndExpireMemberships(uuid: string): Promise<Membership | null> {
        throw new Error("Method not implemented.");
    }
    async addMembership(membership: Membership): Promise<any> {
        await initialize(); 
        if (!sequelize) {
            throw new Error('Sequelize no está inicializado');
        }
        try {
            return await this.withTransaction(async (transaction: any) => {
                const MembershipEntity = MembershipDaoMapper.toEntity(membership);
                await MembershipEntity.save({ transaction });
                return membership;
            });
        } catch (error) {
            console.error('Error creating membership:', error);
            return null;
        }
    }
    async getMembershipbyUserUUID(user: string, transaction?: any): Promise<any> {
        await initialize();
        console.log(user);
        if (!sequelize) {
            throw new Error('Sequelize no está inicializado');
        }
        try {
            return await MembershipEntity.findOne({ where: { user }})
                .then(membershipEntity => membershipEntity ? MembershipDaoMapper.toDomain(membershipEntity) : null);
        } catch (error) {
            console.error('Error finding user by uuid:', error);
            return null;
        }


    }
    async updateMembershipbyUserUUID(membership: Membership, user:string): Promise<any> {
        await initialize();
        if (!sequelize) {
            throw new Error('Sequelize no está inicializado');
        }
        try {
            return await this.withTransaction(async (transaction: any) => {
                await MembershipEntity.update(membership, { where: { user }, transaction });
                return membership;
            });
        } catch (error) {
            console.error('Error updating membership:', error);
            return null;
        }
    }
    
}
