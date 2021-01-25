import { KafkaService } from './KafkaService'
import { v4 as uuid } from 'uuid';

class SendEmail {
    public main(): void {
        const service = new KafkaService(SendEmail.name + uuid(), this.parse, SendEmail.name)
        service.consumer('ECOMMERCE_SEND_EMAIL')
    }

    private parse(topic, partition, message): void {
        console.log(`Parse funcioton -> value:${message.value} , Topic:${topic}, Partition:${partition}`)
    }
}
new SendEmail().main()


