import { ActivatePromotionUseCase } from "../../application/use_case/ActivatePromotionUseCase";
import { Request, Response } from "express";

export class ActivatePromotionController {
    constructor(private activatePromotionUseCase: ActivatePromotionUseCase) {}

    async execute(req: Request, res: Response) {
        try {
            const userId = req.params.uuid;
            const discount = await this.activatePromotionUseCase.execute(userId);
            res.status(200).json({
                data: { updatedTo: discount.hasUsedPromotion},
                message: "Promotion activated successfully",
                success: true,
                statusCode: 200
            });
        } catch (error: any) {
            res.status(500).json({
                message: error.message,
                success: false,
                statusCode: 500
            });
        }
    }
}
