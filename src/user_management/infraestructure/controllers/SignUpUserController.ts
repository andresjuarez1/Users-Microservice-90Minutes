import { BaseResponse } from './../../application/dtos/response/BaseResponse';
import { EmailService } from '../../domain/services/EmailServices';
import { Request, Response } from "express";
import { EncryptService } from '../../domain/services/EncriptServices';
import { SignUpUserCase } from '../../application/use_case/SignUpUserCase';
import { ApplyFirstTimePromotionUseCase } from '../../application/use_case/PromotionUseCase';

export class SignUpUserController {
    constructor(
        readonly useCase: SignUpUserCase,
        readonly emailService: EmailService,
        readonly encryptionService: EncryptService,
        readonly applyFirstTimePromotionUseCase: ApplyFirstTimePromotionUseCase
    ) {}

    async execute(req: Request, res: Response) {
        try {
            req.body.password = await this.encryptionService.execute(req.body.password);
            let baseResponse = await this.useCase.execute(req);
            let user = baseResponse.data;

            const discount = await this.applyFirstTimePromotionUseCase.execute(user.uuid);

            let message = `Welcome ${user.name} to our platform. Enjoy a 75% discount on your first shipment!`;
            this.emailService.sendEmail(user.email, "Welcome", message);

            baseResponse.data = { user, discount };
            baseResponse.apply(res);
        } catch (error) {
            console.error(error);
            const baseResponse = new BaseResponse(null, 'Internal server error', false, 500);
            baseResponse.apply(res);
        }
    }
}
