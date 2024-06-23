import { Membership } from "../../domain/entities/Membership";
import { User } from "../../domain/entities/User";
import { MembershipService } from "../../domain/ports/MembershipInterface";
import { UserInterface } from "../../domain/ports/UserInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { Request } from "express";
export class AddMembershipUseCase {
    
    constructor(readonly membershipService: MembershipService, readonly userInterface: UserInterface) {}

    async executeAdd(membership:Membership): Promise<BaseResponse> {
        let user: User | null = await this.userInterface.findByUUID(membership.user);
        if (!user) {
            return new BaseResponse(null, 'User not found', false, 404);
        }
        let result = await this.membershipService.addMembership(membership);
        if (result) {
            return new BaseResponse(membership, 'Membership added successfully', true, 201);
        }
        return new BaseResponse(null, 'Membership not added', false, 400);
    }
    async executeUpdate(membership:Membership, useruuid:string): Promise<BaseResponse> {
        let user: User | null = await this.userInterface.findByUUID(membership.user);
        if (!user) {
            return new BaseResponse(null, 'User not found', false, 404);
        }
        let result = await this.membershipService.updateMembershipbyUserUUID(membership, useruuid);
        if (result) {
            return new BaseResponse(membership, 'Membership updated successfully', true, 201);
        }
        return new BaseResponse(null, 'Membership not updated', false, 400);
    }

    async checkVigency(useruuid:string): Promise<boolean|any> {
        let result = await this.membershipService.getMembershipbyUserUUID(useruuid);
        if (result) {
            return result;
        }
        return null
    }
}