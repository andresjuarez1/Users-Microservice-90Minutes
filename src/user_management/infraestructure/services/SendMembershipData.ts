import { Signale } from "signale";
import { setupRabbitMQ } from "../config/RabbitConfig";
import { Membership } from "../../domain/entities/Membership";
import { addMembershipController} from "../../infraestructure/Dependencies";

export class SendMembershipData {
    private queueName: string = process.env.RABBIT_QUEUE_SEND_MEMBERSHIP_DATA || 'membership';
    private exchangeName: string = process.env.RABBIT_EXCHANGE_PAYMENT || 'membership';
    private routingKey: string = process.env.RABBIT_ROUTING_KEY_SEND_MEMBERSHIP_DATA || 'membership';

    async listenForMembershipData(): Promise<void> {
        const signale = new Signale();
        try {
            const channel = await setupRabbitMQ(this.queueName, this.exchangeName, this.routingKey);
            channel.consume(this.queueName, async (msg: any) => {
                if (msg) {
                    signale.info('Membership paid data received:', msg.content.toString());
                    const content: any = JSON.parse(msg.content.toString());
                    addMembershipController.execute(content)
                    

                    signale.info('Processed membership data:', content);
                    channel.ack(msg);
                    
                }
            });
        } catch (error) {
            signale.error('Error:', error);
        }
    }
}
