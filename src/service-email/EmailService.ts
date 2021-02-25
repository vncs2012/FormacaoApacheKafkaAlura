import { v4 as uuid } from 'uuid';
import { kafkaConsumer } from '../common-kafka/kafkaConsumer';

class SendEmail {
    public nameClass: string = SendEmail.name
    public main(): void {
        const service = new kafkaConsumer(this.nameClass, this.parse, this.nameClass)
        service.consumer('ECOMMERCE_SEND_EMAIL')
    }

    private parse(topic, partition, message): void {

        const headers = JSON.parse(message.headers.correlationid)
        console.log(`${headers.id._id} Parse funcioton -> value:${message.value} , Topic:${topic}, Partition:${partition}`)
    }
}
new SendEmail().main()


