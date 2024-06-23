import { get } from "http";
import { AddMembershipUseCase } from "../../application/use_case/AddMembershipUseCase";
import { Membership } from "../../domain/entities/Membership";


export class AddMembershipController {
    constructor(private addMembershipUseCase: AddMembershipUseCase) {}

    async execute(content:any) {
        try {
            let vigency = await this.addMembershipUseCase.checkVigency(content.userId);
            let membership = this.createMembership(content);
            console.log('vigency',vigency.vigent);
            if (vigency == null) {
                this.addMembershipUseCase.executeAdd(membership);
            }
            else if (vigency.vigent == false) {
                vigency = this.updateVigency(vigency,content);
                this.addMembershipUseCase.executeUpdate(vigency, content.userId);
            }

        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    private updateVigency(vigency:Membership,content: any): any {
        vigency.vigent = true;
        if (content.type == 'monthly') {
            vigency.endDate = this.getEndDateFormat(content.type);
            vigency.type = 'monthly';
            vigency.amount = 0.15;

        }
        else if (content.type === 'annual' ){
            vigency.endDate = this.getEndDateFormat(content.type);
            vigency.type = 'annual';
            vigency.amount = 0.25;
        }
        else {
            throw new Error('Invalid membership type');
        }
        return vigency;
    }
    private createMembership(content: any): Membership {
       
        const user = content.userId;
        const initialDate = new Date();
        let endDate = "";
        let amount = 0;
        let initialDateFormat = this.getDateFormat(initialDate);
        if (content.type == 'monthly') {
            endDate = this.getEndDateFormat(content.type);
            amount = 0.15
        } else if (content.type === 'annual' ){
            endDate = this.getEndDateFormat(content.type);
            amount = 0.25
        } else {
            throw new Error('Invalid membership type');
        } 
        return new Membership( user, initialDateFormat, endDate, true, content.type, amount);
    }
    private getEndDateFormat( type:string): any {
        const initialDate = new Date();

        let endDate = new Date(initialDate);
        let endDateFormat;
        if (type == 'monthly') {
            endDate.setMonth(initialDate.getMonth() + 1);
            endDateFormat = this.getDateFormat(endDate);
        } else if (type === 'annual' ){
            endDate.setFullYear(endDate.getFullYear() + 1);
            endDateFormat = this.getDateFormat(endDate);
        }
        return endDateFormat;
    }

    private getDateFormat(date: Date): string {
        return date.toISOString().slice(0, 19).replace('T', ' ');
    }

}