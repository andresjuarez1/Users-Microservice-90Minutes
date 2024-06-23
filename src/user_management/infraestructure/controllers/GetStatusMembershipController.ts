import { GetStatusMembershipUseCase } from "../../application/use_case/GetStatusMembershipUseCase";
import { Request, Response } from "express";

export class GetStatusMembershipController {
    constructor(private getStatusMembershipUseCase: GetStatusMembershipUseCase) {}

    async execute(req: Request, res: Response) {
        try {
            const userId = req.params.uuid;
            const discount = await this.getStatusMembershipUseCase.execute(userId);
            if (discount == null) {
                return res.status(404).json({
                    data : null,
                    message: "User does not have a membership",
                    success: true,
                    statusCode: 404
                });
            }
            res.status(200).json({
                data: { user:userId, vigent: discount.vigent, amount: discount.amount},
                message: "Membership found successfully",
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
