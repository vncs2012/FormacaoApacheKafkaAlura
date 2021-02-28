import { consumerService } from '../common-kafka/consumer/ConsumerService';
import { ServiceFactory } from '../common-kafka/consumer/ServiceFactory';
import { ServiceRunner } from '../common-kafka/consumer/ServiceRunner';

class SendEmail implements consumerService<SendEmail>, ServiceFactory<SendEmail> {
    public nameClass: string = SendEmail.name
    public main() {
        new ServiceRunner(this.create(SendEmail)).start(5);
    }
    create(type: new (...args: any[]) => SendEmail, ...args: any[]): consumerService<SendEmail> {
        return new type(...args);
    }

    public getTopic(): string { return "ECOMMERCE_SEND_EMAIL" }

    public getConsumerGroup(): string { return SendEmail.name }

    public parse(topic, partition, message): void {
        const headers = JSON.parse(message.headers.correlationid)
        console.log(`correlationid=>${headers.id._id} \n  value->${message.value} \n Topic:${topic}`)
    }
}
new SendEmail().main()


