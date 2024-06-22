import { Signale } from "signale";
import { setupRabbitMQ } from "../config/RabbitConfig";

export class SendMembershipData {
    private queueName: string = process.env.RABBIT_QUEUE_SEND_MEMBERSHIP_DATA || 'default';
    private exchangeName: string = process.env.RABBIT_EXCHANGE_PAYMENT || 'default';
    private routingKey: string = process.env.RABBIT_ROUTING_KEY_SEND_MEMBERSHIP_DATA || 'default';

    async listenForMembershipData(): Promise<void> {
        const signale = new Signale();
        try {
            const channel = await setupRabbitMQ(this.queueName, this.exchangeName, this.routingKey);
            channel.consume(this.queueName, (msg: any) => {
                if (msg) {
                    signale.info('Membership data received:', msg.content.toString());
                    const content: any = JSON.parse(msg.content.toString());
                    // TODO: Procesar los datos de membresía recibidos
                    signale.info('Processed membership data:', content);
                    channel.ack(msg);
                }
            });
        } catch (error) {
            signale.error('Error:', error);
        }
    }
}
