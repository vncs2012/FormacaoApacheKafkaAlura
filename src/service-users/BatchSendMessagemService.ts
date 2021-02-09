import mongoose, { connect as inibanco } from "mongoose";
import { kafkaConsumer } from "../common-kafka/kafkaConsumer"
import { KafkaProducer } from "../common-kafka/KafkaProducer";
import { connect } from "./Connect";
import { User } from './user.model'

export class BatchSendMessagemService {
    private nameClass = BatchSendMessagemService.name
    public main(): void {
        console.log('Consumer SEND_MESSAGE_TO_ALL_USERS')
        const service = new kafkaConsumer(this.nameClass, this.parse, this.nameClass)
        service.consumer('SEND_MESSAGE_TO_ALL_USERS')
    }

    private parse(topic, partition, message): void {
        const dataJson = message.value
        console.log(`Topic --> ${dataJson}`)
        const service = new KafkaProducer(this.nameClass)
        User.find().then(data => {
            data.map(user => {
                const userJson = JSON.stringify(user._id)
                console.log(userJson)
                service.producer('USER_GENERATE_READING_REPORT', userJson, userJson)
            })
        }).catch(err => console.error(err))
    }
}

connect(new BatchSendMessagemService)

