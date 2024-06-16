import { UserInterface } from "../../domain/ports/UserInterface";
import { Request, Response } from "express";

export class GetPromotionStatusController {
    constructor(private userRepository: UserInterface) {}

    async execute(req: Request, res: Response) {
        try {
            const userId = req.params.uuid;
            const user = await this.userRepository.findByUUID(userId);
            if (!user) {
                res.status(404).json({ message: "User not found", success: false });
                return;
            }
            res.status(200).json({ hasUsedPromotion: user.hasUsedPromotion });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message, success: false });
            } else {
                res.status(500).json({ message: "An unknown error occurred", success: false });
            }
        }
    }
}
