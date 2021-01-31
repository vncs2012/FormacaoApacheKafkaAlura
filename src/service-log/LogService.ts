import { v4 as uuid } from 'uuid';
import { kafkaConsumer } from '../common-kafka/kafkaConsumer';

class LogService {
    public main(): void {
        let nameClass = LogService.name
        const topic: RegExp = /ECOMMERCE.*/i
        const service = new kafkaConsumer(nameClass, this.parse, nameClass)
        service.consumer(topic)
    }

    private parse(topic, partition, message): void {
        console.log(`Parse funcioton -> value:${message.value} , Topic:${topic}, Partition:${partition}`)
    }
}
new LogService().main()




