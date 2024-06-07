import { UserInterface } from "../../domain/ports/UserInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";

export class ActivateUserCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(uuid:string): Promise<BaseResponse> {
        let result = await this.userInterface.updateUserVerifiedAt(uuid);
        if (result) {
            return new BaseResponse(null, 'User activated successfully', true, 200);
        } 
        return new BaseResponse(null, 'User not found', false, 404);
    }
}