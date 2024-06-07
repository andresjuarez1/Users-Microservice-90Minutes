import { BaseResponse } from './../../application/dtos/response/BaseResponse';
import { Request, Response } from "express";
import { ListUsersCase } from '../../application/use_case/ListUsersCase';

export class ListUsersController {
    constructor(readonly useCase: ListUsersCase) { }

    async execute(req: Request, res: Response) {
        try {
            const baseResponse = await this.useCase.execute();
            baseResponse.apply(res);
        } catch (error) {
            const baseResponse = new BaseResponse(null, "Internal server error", false, 500);
            res.status(204).send(baseResponse);
        }
    }
}