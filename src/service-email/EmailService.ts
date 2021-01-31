import { v4 as uuid } from 'uuid';
import { kafkaConsumer } from '../common-kafka/kafkaConsumer';

class SendEmail {
    public main(): void {
        const service = new kafkaConsumer(SendEmail.name + `-${uuid()}`, this.parse, SendEmail.name)
        service.consumer('ECOMMERCE_SEND_EMAIL')
    }

    private parse(topic, partition, message): void {
        console.log(`Parse funcioton -> value:${message.value} , Topic:${topic}, Partition:${partition}`)
    }
}
new SendEmail().main()


