import { Request, Response } from "express";
import { UpdateUserRequest } from "../../application/dtos/request/UpdateUserRequest";
import { UserResponse } from "../../application/dtos/response/UserResponse";
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { UpdateUserUseCase } from "../../application/use_case/UpdateUserCase";
import { EncryptService } from "../../domain/services/EncriptServices";

export class UpdateUserController {
    constructor(readonly useCase: UpdateUserUseCase, readonly encryptionService: EncryptService) { }

    async execute(req: Request, res: Response) {
        const { uuid } = req.params;
        req.body.password = await this.encryptionService.execute(req.body.password);
        try {
            const baseResponse = await this.useCase.execute(uuid, req);
            baseResponse.apply(res);
        } catch (error) {
            const baseResponse = new BaseResponse(null, "Internal server error", false, 500);
            res.status(204).send(baseResponse);
        }
    }
}