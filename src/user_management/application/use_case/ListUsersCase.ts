import { User } from "../../domain/entities/User";
import { UserInterface } from "../../domain/ports/UserInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { UserDtoMapper } from "../mappers/UserDtoMapper";

export class ListUsersCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(): Promise<BaseResponse> {
        let result = await this.userInterface.list();
        if (result) {
            let responses = result.map((user: User) => UserDtoMapper.toUserResponse(user));
            return new BaseResponse(responses, 'Users found', true, 200);
        }
        return new BaseResponse(null, 'Users not found', false, 404);
    }
}