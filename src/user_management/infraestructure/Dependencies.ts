import { ActivateUserCase } from "../application/use_case/ActivateUserCase";
import { DeleteUserCase } from "../application/use_case/DeleteUserCase";
import { GetByUserCase } from "../application/use_case/GetByUserCase";
import { ListUsersCase } from "../application/use_case/ListUsersCase";
import { SignInUserUseCase } from "../application/use_case/SignInUserUseCase";
import { SignOutUserCase } from "../application/use_case/SignOutUserCase";
import { SignUpUserCase } from "../application/use_case/SignUpUserCase";
import { UpdateUserUseCase } from "../application/use_case/UpdateUserCase";
import { ApplyFirstTimePromotionUseCase } from "../application/use_case/PromotionUseCase";
import { ActivatePromotionUseCase } from "../application/use_case/ActivatePromotionUseCase"; 

import { ActivateUserController } from "./controllers/ActivateUserController";
import { DeleteUserController } from "./controllers/DeleteUserController";
import GetUserByEmailController from "./controllers/GetUserByEmailController";
import GetUserByUuidController from "./controllers/GetUserByUuidController";
import { ListUsersController } from "./controllers/ListUsersController";
import { SignInUserController } from "./controllers/SignInUserController";
import { SignOutUserController } from "./controllers/SignOutUserController";
import { SignUpUserController } from "./controllers/SignUpUserController";
import { UpdateUserController } from "./controllers/UpdateUserController";
import { GetPromotionStatusController } from "./controllers/GetPromotionController";
import { ActivatePromotionController } from "./controllers/ActivatePromotionController";

import { MysqlUserRepository } from "./repositories/MysqlUserRepository";
import { PromotionService } from "../domain/services/PromotionService";

import { ByEncryptServices } from "./services/ByEncryptServices";
import { NodemailerEmailService } from "./services/NodemailerEmailService";
import { TokenServices } from "./services/TokenServices";

export const databaseRepository = new MysqlUserRepository();
export const encriptServices = new ByEncryptServices();
export const nodemailerEmailService = new NodemailerEmailService();
export const tokenServices = new TokenServices();
export const promotionService = new PromotionService();

export const singUpUserCase = new SignUpUserCase(databaseRepository, promotionService);
export const getUserUseCase = new GetByUserCase(databaseRepository);
export const updateUserUseCase = new UpdateUserUseCase(databaseRepository);
export const deleteUserUseCase = new DeleteUserCase(databaseRepository);
export const listUsersCase = new ListUsersCase(databaseRepository);
export const activateUserCase = new ActivateUserCase(databaseRepository);
export const singInUserCase = new SignInUserUseCase(databaseRepository);
export const singOutUserCase = new SignOutUserCase(databaseRepository);
export const applyFirstTimePromotionUseCase = new ApplyFirstTimePromotionUseCase(databaseRepository, promotionService);
export const activatePromotionUseCase = new ActivatePromotionUseCase(databaseRepository); 

export const singInUserController = new SignInUserController(singInUserCase, encriptServices, tokenServices);
export const singUpUserController = new SignUpUserController(singUpUserCase, nodemailerEmailService, encriptServices, applyFirstTimePromotionUseCase);
export const deleteUserController = new DeleteUserController(deleteUserUseCase);
export const getByUuidController = new GetUserByUuidController(getUserUseCase);
export const getByEmailController = new GetUserByEmailController(getUserUseCase);
export const updateUserController = new UpdateUserController(updateUserUseCase, encriptServices);
export const listUsersController = new ListUsersController(listUsersCase);
export const activateUserController = new ActivateUserController(activateUserCase);
export const singOutUserController = new SignOutUserController(singOutUserCase);
export const activatePromotionController = new ActivatePromotionController(activatePromotionUseCase); 
export const getPromotionStatusController = new GetPromotionStatusController(databaseRepository);
