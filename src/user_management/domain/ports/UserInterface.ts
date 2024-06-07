import { EncryptService } from "../services/EncriptServices";
import { User } from "../entities/User";
import { TokenServices } from "../services/TokenServices";

export interface UserInterface {
    findByEmail(email: string): Promise<User | null>;
    findByUUID(uuid: string): Promise<User | null>;
    delete(uuid: string): Promise<boolean>;
    update(uuid:string, user: User): Promise<User | null>;
    list(): Promise<User[]|null>;
    updateUserVerifiedAt(uuid: string):Promise<boolean>;
    sign_up(user: User): Promise<User | null>;
    sign_in (email:string, password:string, encryptionService: EncryptService, tokenServices: TokenServices):Promise<User|null>;
    sign_out (uuid:string):Promise<boolean>; 

}
