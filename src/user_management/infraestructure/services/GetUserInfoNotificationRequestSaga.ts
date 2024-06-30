import { Credentials } from '../../domain/entities/Credentials';
import { Signale } from "signale";
import { setupRabbitMQ } from "../config/RabbitConfig";
import dotenv from "dotenv";
import { GetByUserCase } from "../../application/use_case/GetByUserCase";
import { NotificationRequest } from "../../application/dtos/request/NotificationRequest";
import { NotificationResponse } from "../../application/dtos/response/NotificationResponse";
import { BaseResponse } from '../../application/dtos/response/BaseResponse';

dotenv.config()

export class GetUserInfoNotificationRequestSaga {
    private queueNameReq: string = process.env.RABBIT_QUEUE_GET_USER_INFO_NOTIFICATION_REQ || 'default';
    private exchangeName: string = process.env.RABBIT_EXCHANGE_NOTIFICATION||'default';
    private routingKeyReq: string = process.env.RABBIT_ROUTING_KEY_GET_USER_INFO_NOTIFICATION_REQ || 'default';
    private queueNameRes: string = process.env.RABBIT_QUEUE_GET_USER_INFO_NOTIFICATION_RES || 'default';
    private routingKeyRes: string = process.env.RABBIT_ROUTING_KEY_GET_USER_INFO_NOTIFICATION_RES || 'default';
    private useCase: GetByUserCase;
    constructor(useCase: GetByUserCase) {
        this.useCase = useCase;
    }

    async execute(): Promise<void> {
        const signale = new Signale();
        try {
            const channel = await setupRabbitMQ(this.queueNameReq, this.exchangeName, this.routingKeyReq);
            channel.consume(this.queueNameReq, async (msg:any) => {
                if (msg) {
                    signale.info('User Info response received:', msg.content.toString());
                    const content: NotificationRequest = JSON.parse(msg.content.toString());
                    let result: BaseResponse = await this.useCase.executeByUUID(content.clientID);
                    if (result.success) {
                        let channelres = await setupRabbitMQ(this.queueNameRes, this.exchangeName, this.routingKeyRes);
                        let response = new NotificationResponse(content.packageID, result.data.email, result.data.name, content.status);
                        channelres.publish(this.exchangeName, this.routingKeyRes, Buffer.from(JSON.stringify(response)));
                        signale.info('Sent user Info response to', this.routingKeyRes, ':', response);
                    }                    
                    signale.warn('Cant Sent user Info response to', this.routingKeyRes, ':', result);
                    channel.ack(msg);
                }
            });
        } catch (error) {
            signale.error('Error:', error);
        }
    }
}
