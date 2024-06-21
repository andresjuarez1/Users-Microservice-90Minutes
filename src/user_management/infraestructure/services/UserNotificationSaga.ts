import {Signale} from "signale";
import { setupRabbitMQ } from "../config/RabbitConfig";

export class UserNotificationSaga {
    private queueName: string = process.env.RABBIT_EXCHANGE_NOTIFICATION || 'default';
    private exchangeName: string = process.env.RABBIT_EXCHANGE_NOTIFICATION || 'default';
    private routingKey: string = process.env.RABBIT_ROUTING_KEY_USER_TOKEN || 'default';

    async sendNotificationNewUser(email:string, token: string): Promise<void> {
        const signale = new Signale();
        try {
            const channel = await setupRabbitMQ(this.queueName, this.exchangeName, this.routingKey);
            channel.publish(this.exchangeName, this.routingKey, Buffer.from(JSON.stringify({"email":email, "token": token })));
            signale.info('Message sent:', token.toString(), 'to', this.routingKey);
        } catch (error) {
            signale.error('Error:', error);
        }
    }
}