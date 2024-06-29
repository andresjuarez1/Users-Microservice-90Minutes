import { UserInterface } from "../../domain/ports/UserInterface";
import { Request } from "express";
import { UserDtoMapper } from "../mappers/UserDtoMapper";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { UserNotificationSaga } from "../../infraestructure/services/UserNotificationSaga";
import { PromotionService } from "../../domain/services/PromotionService";

export class SignUpUserCase {
    constructor(
        readonly userInterface: UserInterface,
        private promotionService: PromotionService
    ) {}

    async execute(req: Request): Promise<BaseResponse> {
        try {
            let request = UserDtoMapper.toSignUpUserRequest(req);
            if (!request) {
                return new BaseResponse(null, 'Bad request', false, 400);
            }
            let user = UserDtoMapper.toDomainUserSignUp(request);
            let result = await this.userInterface.sign_up(user);
            if (result) {
                const discount = this.promotionService.applyFirstTimePromotion(result);
                const notification = new UserNotificationSaga();
                let response = UserDtoMapper.toUserResponse(result);
                notification.sendNotificationNewUser(response.email, response.token, response.name, response.address, response.lastName, response.uuid, discount);
                return new BaseResponse(response, 'User created successfully', true, 201);
            }
            return new BaseResponse(null, 'User not created', false, 400);
        } catch (error) {
            console.error('Error in SignUpUserCase:', error);
            return new BaseResponse(null, 'Internal server error', false, 500);
        }
    }
}
