import { kafkaConsumer } from '../common-kafka/kafkaConsumer';
import { KafkaProducer } from '../common-kafka/KafkaProducer';
import { routeCorrelationId } from '../common-kafka/functions'

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


