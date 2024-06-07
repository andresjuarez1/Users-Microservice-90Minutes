import { Request, Response } from "express";
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { DeleteUserCase } from "../../application/use_case/DeleteUserCase";

export class DeleteUserController {
  constructor(readonly useCase: DeleteUserCase) {}

  async execute(req: Request, res: Response) {
    const { uuid } = req.params;
    try {
      const baseReponse = await this.useCase.execute(uuid);
      baseReponse.apply(res);
    } catch (error) {
      const baseReponse = new BaseResponse("Error", "Ha ocurrido un error durante su petición.", false, 500);
      baseReponse.apply(res);
    }
  }
}