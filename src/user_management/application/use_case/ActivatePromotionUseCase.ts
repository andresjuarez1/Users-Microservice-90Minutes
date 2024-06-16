import { UserInterface } from "../../domain/ports/UserInterface";

export class ActivatePromotionUseCase {
    constructor(private userRepository: UserInterface) {}

    async execute(uuid: string) {
        const user = await this.userRepository.findByUUID(uuid);
        if (!user) {
            throw new Error('User not found');
        }
        user.hasUsedPromotion = true;
        await this.userRepository.update(user.uuid, user);
        return user;
    }
}
