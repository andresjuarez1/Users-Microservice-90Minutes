import { v4 as uuidv4 } from 'uuid';
import { ValidatableEntity } from '../validations/ValidatableEntity';
import { Status } from './Status';
import { Contact } from './Contact';
import { Credentials } from './Credentials';

export class User implements ValidatableEntity {

    public uuid: string;

    public contact: Contact;

    public credentials: Credentials;

    public status: Status;


    constructor(contact: Contact, credentials: Credentials, status: Status) {
        this.uuid = uuidv4();
        this.contact = contact
        this.credentials = credentials
        this.status = status
    }

    async validate() {
        return Promise.resolve();
    }
}