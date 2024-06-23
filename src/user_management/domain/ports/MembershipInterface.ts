import { Membership } from "../entities/Membership";

export interface MembershipService {
    checkAndExpireMemberships(uuid:string): Promise<Membership | null>;
    addMembership(membership:Membership): Promise<Membership | any>;
    getMembershipbyUserUUID(uuid:string): Promise<Membership | any>;
    updateMembershipbyUserUUID(membership:Membership, useruuid:string): Promise<Membership | any>;
  }
  