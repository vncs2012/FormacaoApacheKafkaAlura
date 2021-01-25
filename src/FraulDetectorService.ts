import { KafkaService } from './KafkaService'
import { v4 as uuid } from 'uuid';

class FraulDetectorService {
    public main(): void {
        const service = new KafkaService(FraulDetectorService.name + uuid(), this.parse, FraulDetectorService.name)
        service.consumer('ECOMMERCE_NEW_ORDER')
    }

    private parse(topic, partition, message): void {
        console.log(`Parse funcioton -> value:${JSON.parse(message.value).email} , Topic:${topic}, Partition:${partition}`)
    }
}
new FraulDetectorService().main()


