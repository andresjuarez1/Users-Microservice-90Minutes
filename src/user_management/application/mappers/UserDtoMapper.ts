import { Credentials } from './../../domain/entities/Credentials';
import { Request } from 'express';
import { SignUpUserRequest } from '../dtos/request/SignUpUserRequest';
import { User } from '../../domain/entities/User';
import { UserResponse } from '../dtos/response/UserResponse';
import { Contact } from '../../domain/entities/Contact';
import { Status } from '../../domain/entities/Status';
import { UpdateUserRequest } from '../dtos/request/UpdateUserRequest';
import { SignInUserRequest } from '../dtos/request/SignInUserRequest';

export class UserDtoMapper {
    static toSignUpUserRequest(req: Request): SignUpUserRequest | null {
        const body = req.body;
        if (!body.email || !body.password || !body.name || !body.lastName || !body.phoneNumber) {
            return null;
        }
        return new SignUpUserRequest(body.email, body.password, body.name, body.lastName, body.phoneNumber, body.address);
    }

    static toSignIpUserRequest(req: Request): SignInUserRequest | null{
        const body = req.body;
        if (!body.email || !body.password) {
            return null;
        }
        return new SignInUserRequest(body.email, body.password);
    }

    static toUpdateUserRequest(req: Request): UpdateUserRequest {
        const body = req.body;

        return new UpdateUserRequest(body.email, body.password, body.name, body.lastName, body.phoneNumber, body.address);
    }

    static toUserResponse(user: User): UserResponse {
        if (!user.status.token){
            user.status.token = "";
        }
        return new UserResponse(user.uuid, user.contact.name, user.credentials.email, user.contact.lastName, user.contact.phoneNumber, user.contact.address, user.status.token);
    }

    static toDomainUserSignUp(signUpUserRequest: SignUpUserRequest): User {
        let contact = new Contact(signUpUserRequest.name, signUpUserRequest.lastName, signUpUserRequest.phoneNumber, signUpUserRequest.address);
        let credentials = new Credentials(signUpUserRequest.email, signUpUserRequest.password);
        let status = new Status("", new Date());
        return new User(contact, credentials, status, false);
    }

    static toDomainUserUpdate(updateUserRequest: UpdateUserRequest): User {
        let contact = new Contact(updateUserRequest.name, updateUserRequest.lastName, updateUserRequest.phoneNumber, updateUserRequest.address);
        let credentials = new Credentials(updateUserRequest.email, updateUserRequest.password);
        let status = new Status("", new Date());
        return new User(contact, credentials, status, false);
    }


}