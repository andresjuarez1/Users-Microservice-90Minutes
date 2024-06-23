import { Membership } from './../../domain/entities/Membership';
import MembershipEntity from "../daos/MembershipEntity";

export class MembershipDaoMapper {
    static toDomain(membershipEntity: MembershipEntity): Membership{
        let membership = new Membership(membershipEntity.dataValues.user, membershipEntity.dataValues.startDate, membershipEntity.dataValues.endDate,membershipEntity.dataValues.vigent, membershipEntity.dataValues.type, membershipEntity.dataValues.amount, membershipEntity.dataValues.nextMembership);
        return membership;
    }

    static toEntity(membership: Membership): MembershipEntity {

        return MembershipEntity.build(
            {
                uuid: membership.uuid,
                user: membership.user,
                startDate: membership.initialDate,
                endDate: membership.endDate,
                type: membership.type,
                vigent: membership.vigent,
                amount: membership.amount,
                nextMembership: membership.nextMembership
            }
        );
    }
}

