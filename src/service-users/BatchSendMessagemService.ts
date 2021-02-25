import { routeCorrelationId } from "../common-kafka/functions";
import { kafkaConsumer } from "../common-kafka/kafkaConsumer"
import { KafkaProducer } from "../common-kafka/KafkaProducer";
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
        const correlationId = routeCorrelationId(headers.id, nameClass)
      
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

