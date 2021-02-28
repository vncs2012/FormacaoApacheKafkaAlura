import { consumerService } from '../common-kafka/consumer/ConsumerService';
import { ServiceFactory } from '../common-kafka/consumer/ServiceFactory';
import { ServiceRunner } from '../common-kafka/consumer/ServiceRunner';
import { KafkaProducer } from '../common-kafka/dispatcher/KafkaProducer';
import { routeCorrelationId } from '../common-kafka/functions';

class EmailNewOrderService implements consumerService<EmailNewOrderService>, ServiceFactory<EmailNewOrderService> {
    public nameClass: string = EmailNewOrderService.name

    public main(): void {
        new ServiceRunner(this.create(EmailNewOrderService)).start(3)
    }

    getConsumerGroup(): string {
        return this.nameClass
    }

    getTopic(): string {
        return 'ECOMMERCE_NEW_ORDER'
    }

    create(type: new (...args: any[]) => EmailNewOrderService, ...args: any[]): consumerService<EmailNewOrderService> {
        return new type(...args)
    }

    public parse(topic, partition, message): void {
        const nameClass = EmailNewOrderService.name
        const { email, amount } = JSON.parse(message.value)
        const headers = JSON.parse(message.headers.correlationid)
        const correlationId = routeCorrelationId(headers.id, nameClass)

        console.log('processing new order, preparing email')
        console.log(`${headers.id._id} Parse funcioton -> value:${email}-${amount} , Topic:${topic}`)

        var emailCode = "Thank you for your order! We are processing your order!";
        const service = new KafkaProducer(nameClass)

        service.producer("ECOMMERCE_SEND_EMAIL", correlationId, email, emailCode);
    }
}
new EmailNewOrderService().main()


