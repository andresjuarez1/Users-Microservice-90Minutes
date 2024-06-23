import { v4 as uuidv4 } from 'uuid';
import { ValidatableEntity } from '../validations/ValidatableEntity';


export class Membership implements ValidatableEntity {
    public uuid: string
    public user: string
    public initialDate: string
    public endDate: string
    public vigent: boolean
    public type: string
    public amount: number
    public nextMembership?: string
    constructor(
        user: string,
        initialDate: string,
        endDate: string,
        vigent: boolean,
        type: string,
        amount: number,
        nextMembership?: string
    ) {
        this.uuid = uuidv4();
        this.user = user;
        this.initialDate = initialDate;
        this.endDate = endDate;
        this.vigent = vigent;
        this.type = type;
        this.amount = amount;
        this.nextMembership = nextMembership;
    }
    async validate() {
        return Promise.resolve();
    }
}