import { Signale } from "signale";
import { setupRabbitMQ } from "../config/RabbitConfig";

export class CheckMembershipNotPaidRequest {
    private queueName: string = process.env.RABBIT_QUEUE_CHECK_MEMBERSHIP_NOT_PAID_REQ || 'default';
    private exchangeName: string = process.env.RABBIT_EXCHANGE_PAYMENT || 'default';
    private routingKeyRes: string = process.env.RABBIT_ROUTING_KEY_CHECK_MEMBERSHIP_NOT_PAID_RES || 'default';

    async listenForCheckMembershipNotPaidRequests(): Promise<void> {
        const signale = new Signale();
        try {
            const channel = await setupRabbitMQ(this.queueName, this.exchangeName, this.routingKeyRes);
            channel.consume(this.queueName, async (msg: any) => {
                if (msg) {
                    signale.info('CheckMembershipNotPaid request received:', msg.content.toString());
                    const content: any = JSON.parse(msg.content.toString());
                
                    const membershipData = {
                        userId: content.userId,
                        isPaid: false, 
                    };
                    
                    const responseMessage = JSON.stringify(membershipData);
                    channel.publish(this.exchangeName, this.routingKeyRes, Buffer.from(responseMessage));
                    signale.info('Sent CheckMembershipNotPaid response to', this.routingKeyRes, ':', responseMessage);
                    channel.ack(msg);
                }
            });
        } catch (error) {
            signale.error('Error:', error);
        }
    }
}
