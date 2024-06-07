import { User } from './../../domain/entities/User';
import { Contact } from './../../domain/entities/Contact';
import UserEntity from "../daos/UserEntity";
import { Credentials } from '../../domain/entities/Credentials';
import { Status } from '../../domain/entities/Status';

export class UserDaoMapper {
    static toDomain(userEntity: UserEntity): User{
        let contact = new Contact(userEntity.dataValues.name, userEntity.dataValues.lastName, userEntity.dataValues.phoneNumber);
        let credentials = new Credentials(userEntity.dataValues.email, userEntity.dataValues.password);
        let status = new Status(userEntity.dataValues.token,userEntity.dataValues.verifiedAt);
        let user = new User(contact, credentials, status);
        user.uuid = userEntity.dataValues.uuid;
        return user;
    }

    static toEntity(user: User): UserEntity {

        return UserEntity.build(
            {
                uuid: user.uuid,
                token: user.status.token,
                verifiedAt: user.status.verifiedAt,
                email: user.credentials.email,
                password: user.credentials.password,
                name: user.contact.name,
                lastName: user.contact.lastName,
                phoneNumber: user.contact.phoneNumber
            }
        );
    }
}

