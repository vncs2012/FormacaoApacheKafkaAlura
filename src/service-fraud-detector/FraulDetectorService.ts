import { consumerService } from '../common-kafka/consumer/ConsumerService';
import { ServiceFactory } from '../common-kafka/consumer/ServiceFactory';
import { ServiceRunner } from '../common-kafka/consumer/ServiceRunner';
import { KafkaProducer } from '../common-kafka/dispatcher/KafkaProducer';
import { routeCorrelationId } from '../common-kafka/functions';

class FraulDetectorService implements consumerService<FraulDetectorService>, ServiceFactory<FraulDetectorService> {

    private className: string = FraulDetectorService.name
    public main(): void {
        new ServiceRunner(this.create(FraulDetectorService)).start(3)
    }
    getConsumerGroup(): string {
        return this.className
    }
    getTopic(): string {
        return 'ECOMMERCE_NEW_ORDER'
    }
    create(type: new (...args: any[]) => FraulDetectorService, ...args: any[]): consumerService<FraulDetectorService> {
        return new type(...args)
    }
    parse(topic, partition, message): void {
        const dataObject = JSON.parse(message.value)
        const dataJson = message.value
        let isFraud = dataObject.amount >= 4500

        const headers = JSON.parse(message.headers.correlationid)
        const correlationId = routeCorrelationId(headers.id, this.className)

        const producer = new KafkaProducer(this.className)
        if (isFraud) {
            console.log(`Order is Fraud -> value:${dataJson}`)
            producer.producer('ECOMMERCE_ORDER_REJECTED', correlationId, dataObject.email, dataJson)
        }
        else {
            console.log(`Approved:->${dataJson}`)
            producer.producer('ECOMMERCE_ORDER_APPROVED', correlationId, dataObject.email, dataJson)
        }
    }
}
new FraulDetectorService().main()


