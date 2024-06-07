import { UserInterface } from "../../domain/ports/UserInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { UserDtoMapper } from "../mappers/UserDtoMapper";

export class GetByUserCase {
    constructor(readonly userInteface: UserInterface) {}

    async executeByEmail(email: string): Promise<BaseResponse> {
        let result = await this.userInteface.findByEmail(email);
        if (result) {
            let response = UserDtoMapper.toUserResponse(result);
            return new BaseResponse(response, 'User found', true, 200);
        } 
        return new BaseResponse(null, 'User not found', false, 404);
    }

    async executeByUUID(uuid:string): Promise<BaseResponse> {
        let result = await this.userInteface.findByUUID(uuid);
        if (result) {
            let response = UserDtoMapper.toUserResponse(result);
            return new BaseResponse(response, 'User found', true, 200);
        }
        return new BaseResponse(null, 'User not found', false, 404);
    }
}