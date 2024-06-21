import {Signale} from "signale";
import { setupRabbitMQ } from "../config/RabbitConfig";

export class UserMemberSaga {
    private queueName: string = process.env.RABBIT_QUEUE_NEW_USER_PAYMENT || 'default';
    private exchangeName: string = process.env.RABBIT_EXCHANGE_PAYMENT || 'default';
    private routingKey: string = process.env.RABBIT_ROUTING_KEY_USER_PAYMENT || 'default';

    async receiveMemberStatus(): Promise<void> {
        const signale = new Signale();
        try {
            const channel = await setupRabbitMQ(this.queueName, this.exchangeName, this.routingKey);
            channel.consume(this.queueName, (msg) => {
                if (msg) {
                    signale.info('Message received:', msg.content.toString());
                    const content:any = JSON.parse(msg.content.toString());
                    // TODO: meter algun estado o estatus que valide que un usuario es miembro o no
                    signale.info('Message received:', content);
                    channel.ack(msg);
                }
            });
        } catch (error) {
            signale.error('Error:', error);
        }
    }
}