import { UserInterface } from "../../domain/ports/UserInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { UserDtoMapper } from "../mappers/UserDtoMapper";
import { Request } from "express";
export class UpdateUserUseCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(uuid:string, req: Request): Promise<BaseResponse> {
        let request = UserDtoMapper.toUpdateUserRequest(req);
        if (!request) {
            return new BaseResponse(null, 'Bad request', false, 400);
        }
        let user = UserDtoMapper.toDomainUserUpdate(request);
        let result = await this.userInterface.update(uuid, user);
        if (result) {
            let response = UserDtoMapper.toUserResponse(result);
            return new BaseResponse(response, 'User updated successfully', true, 201);
        }
        return new BaseResponse(null, 'User not updated', false, 400);
    }
}