import { v4 as uuid } from 'uuid';
import { kafkaConsumer } from '../common-kafka/kafkaConsumer';
import { KafkaProducer } from '../common-kafka/KafkaProducer';
import { Order } from './Order';

class FraulDetectorService {
    public main(): void {
        const service = new kafkaConsumer(FraulDetectorService.name + `-${uuid()}`, this.parse, FraulDetectorService.name)
        service.consumer('ECOMMERCE_NEW_ORDER')
    }

    private parse(topic, partition, message): void {
        const dataObject = JSON.parse(message.value)
        const dataJson = message.value
        let isFraud = dataObject.amount >= 4500
        const producer = new KafkaProducer(FraulDetectorService.name + `-${dataObject.orderId}`)
        if (isFraud) {
            console.log(`Order is Fraud -> value:${dataJson}`)
            producer.producer('ECOMMERCE_ORDER_REJECTED', dataObject.email, dataJson)
        }
        else {
            console.log(`Approved:->${dataJson}`)
            producer.producer('ECOMMERCE_ORDER_APPROVED', dataObject.email, dataJson)
        }
    }
}
new FraulDetectorService().main()


