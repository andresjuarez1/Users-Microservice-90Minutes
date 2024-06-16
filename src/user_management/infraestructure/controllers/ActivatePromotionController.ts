import { ApplyFirstTimePromotionUseCase } from "../../application/use_case/PromotionUseCase";
import { Request, Response } from "express";

export class ActivatePromotionController {
    constructor(private applyFirstTimePromotionUseCase: ApplyFirstTimePromotionUseCase) {}

    async execute(req: Request, res: Response) {
        try {
            const userId = req.params.uuid;
            const discount = await this.applyFirstTimePromotionUseCase.execute(userId);
            res.status(200).json({
                data: { discount },
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
