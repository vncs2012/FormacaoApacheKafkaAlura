import { v4 as uuid } from 'uuid';
import { kafkaConsumer } from '../common-kafka/consumer/kafkaConsumer';

class LogService {
    public main(): void {
        let nameClass = LogService.name
        const topic: RegExp = /ECOMMERCE.*/i
        const service = new kafkaConsumer(nameClass, this.parse, nameClass)
        service.consumer(topic)
    }

    private parse(topic, partition, message): void {
        const headers = JSON.parse(message.headers.correlationid)
        console.log('------------------------------------------------------------------------------------------')
        console.log(`Topic->${topic}\nCorrelation Id -> ${headers.id._id}\ndata -> ${message.value}`)
        console.log('------------------------------------------------------------------------------------------')
    }
}
new LogService().main()




