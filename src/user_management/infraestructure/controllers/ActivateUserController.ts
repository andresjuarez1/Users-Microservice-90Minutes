import { Request, Response } from "express";
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { ActivateUserCase } from "../../application/use_case/ActivateUserCase";

export class ActivateUserController {
  constructor(readonly useCase: ActivateUserCase) {}

  async execute(req: Request, res: Response) {
    const { uuid } = req.params;
    try {
      let baseReponse = await this.useCase.execute(uuid);
      baseReponse.apply(res);
    } catch (error) {
      const baseReponse = new BaseResponse("Error", "Ha ocurrido un error durante su petición.", false, 500);
      baseReponse.apply(res);
    }
  }
}