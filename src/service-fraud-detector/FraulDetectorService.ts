import { v4 as uuid } from 'uuid';
import { CorrelationId } from '../common-kafka/CorrelationId';
import { kafkaConsumer } from '../common-kafka/kafkaConsumer';
import { KafkaProducer } from '../common-kafka/KafkaProducer';
import { Order } from './Order';

class FraulDetectorService {
    private className: string = FraulDetectorService.name
    public main(): void {
        const service = new kafkaConsumer(this.className, this.parse, this.className)
        service.consumer('ECOMMERCE_NEW_ORDER')
    }

    private parse(topic, partition, message): void {
        const dataObject = JSON.parse(message.value)
        const dataJson = message.value
        let isFraud = dataObject.amount >= 4500
        const producer = new KafkaProducer(this.className)
        if (isFraud) {
            console.log(`Order is Fraud -> value:${dataJson}`)
            producer.producer('ECOMMERCE_ORDER_REJECTED', new CorrelationId(this.className), dataObject.email, dataJson)
        }
        else {
            console.log(`Approved:->${dataJson}`)
            producer.producer('ECOMMERCE_ORDER_APPROVED', new CorrelationId(this.className), dataObject.email, dataJson)
        }
    }
}
new FraulDetectorService().main()


