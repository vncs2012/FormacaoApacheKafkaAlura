import { InKafka } from "../service/InKafka";
import { KafkaService } from "../service/KafkaService";

export class kafkaConsumer extends KafkaService implements InKafka {

    constructor(clientId: string, parse?: Function, groupId?: string) {
        super(clientId, parse, groupId)
    }

    public consumer = async (topic: string | RegExp): Promise<void> => {
        const kafka = this.kafka()
        const consumer = kafka.consumer({ groupId: this.groupId })
        await consumer.connect()
        await consumer.subscribe({ topic: topic, fromBeginning: true })
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                this.parse(topic, partition, message)
            }
        })
            .then(console.log)
            .catch(err => {
                console.log(err.message)
                this.disconnect(consumer)
            })
    }

}