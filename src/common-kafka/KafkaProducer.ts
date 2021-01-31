import { InKafka } from './InKafka'
import { KafkaService } from './KafkaService'

export class KafkaProducer extends KafkaService implements InKafka {

    constructor(clientId: string, parse?: Function, groupId?: string) {
        super(clientId, parse, groupId)
    }

    public async producer(topic: string, key: string, value: string): Promise<void> {
        const kafka = this.kafka()
        console.log(value)
        const producer = kafka.producer()
        await producer.connect()
        await producer.send({
            topic: topic,
            messages: [
                { key: key, value: value },
            ],
        })
            .then(ap => console.log(`Sucesso - `, ap)).
            catch(err => console.log(err))
        this.disconnect(producer)
    }
}