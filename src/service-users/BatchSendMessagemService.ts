import { CorrelationId } from "../common-kafka/CorrelationId";
import { kafkaConsumer } from "../common-kafka/kafkaConsumer"
import { KafkaProducer } from "../common-kafka/KafkaProducer";
import { Message } from "../common-kafka/Message";
import { connect } from "./Connect";
import { User } from './user.model'

export class BatchSendMessagemService {
    public nameClass = BatchSendMessagemService.name
    public main(): void {
        const service = new kafkaConsumer(this.nameClass, this.parse, this.nameClass)
        service.consumer('ECOMMERCE_SEND_MESSAGE_TO_ALL_USERS')
    }

    private parse(topic, partition, message): void {
        const nameClass =  BatchSendMessagemService.name
        const headers = JSON.parse(message.headers.correlationid)
        const continueWith = headers.id._id
        const correlationId = new CorrelationId(nameClass)
        correlationId.continueWith(continueWith)
        const service = new KafkaProducer(this.nameClass)
        User.find().then(data => {
            data.map(user => {
                const userJson = JSON.stringify(user._id)
                console.log(userJson)
                service.producer('ECOMMERCE_USER_GENERATE_READING_REPORT',correlationId, userJson, userJson)
            })
        }).catch(err => console.error(err))
    }
}

connect(new BatchSendMessagemService)

