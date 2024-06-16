import { PromotionService } from "../../domain/services/PromotionService";
import { UserInterface } from "../../domain/ports/UserInterface";

export class ApplyFirstTimePromotionUseCase {
    constructor(
        private userRepository: UserInterface,
        private promotionService: PromotionService
    ) {}

    async execute(userId: string): Promise<number> {
        const user = await this.userRepository.findByUUID(userId);
        if (!user) {
            throw new Error("User not found");
        }

        const discount = this.promotionService.applyFirstTimePromotion(user);

        if (discount > 0) {
            user.hasUsedPromotion = true;
            await this.userRepository.update(user.uuid, user);
        }

        return discount;
    }
}
