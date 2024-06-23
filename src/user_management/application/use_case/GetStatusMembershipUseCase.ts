import { MembershipService } from "../../domain/ports/MembershipInterface";

export class GetStatusMembershipUseCase {
    constructor(private userRepository: MembershipService) {}

    async execute(uuid: string) {
        const membership = await this.userRepository.getMembershipbyUserUUID(uuid);
        if (!membership) {
            return null;
        }
        return membership;
    }
}
