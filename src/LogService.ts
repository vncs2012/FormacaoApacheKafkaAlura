import { KafkaService } from './KafkaService'
import { v4 as uuid } from 'uuid';

class LogService {
    public main(): void {
        let nameClass = LogService.name
        const topic: RegExp = /ECOMMERCE.*/i
        const service = new KafkaService(nameClass + '-' + uuid(), this.parse, nameClass)
        service.consumer(topic)
    }

    private parse(topic, partition, message): void {
        console.log(`Parse funcioton -> value:${message.value} , Topic:${topic}, Partition:${partition}`)
    }
}
new LogService().main()




