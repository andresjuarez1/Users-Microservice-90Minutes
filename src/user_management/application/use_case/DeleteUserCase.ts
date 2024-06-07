import { UserInterface } from "../../domain/ports/UserInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";

export class DeleteUserCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(uuid: string): Promise<BaseResponse> {
        let result = await this.userInterface.delete(uuid);
        if (result) {
            return new BaseResponse(null, 'User deleted successfully', true, 200);
        }
        return new BaseResponse(null, 'User not found', false, 404);
    }
}