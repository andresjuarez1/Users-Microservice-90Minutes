import { User } from "../entities/User";

export class PromotionService {
    applyFirstTimePromotion(user: User): number {
        if (!user.hasUsedPromotion) {
            user.hasUsedPromotion = true; 
            return 0.75;
        }
        return 0.0; 
    }
}
