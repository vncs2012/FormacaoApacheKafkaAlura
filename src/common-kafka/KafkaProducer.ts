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
        const admin = kafka.admin()
        await admin.describeCluster() .then(ap => console.log(`describeCluster - `, ap))
        await admin.listGroups() .then(ap => console.log(`listGroups - `, ap))
        await admin.listTopics() .then(ap => console.log(`listTopics - `, ap))
        await producer.connect()
        await producer.send({
            topic: topic,
            messages: [
                { key: key, value: value },
            ],
        })
            .then(ap => console.log(`Sucesso - `, ap)).
            catch(err => console.log(err.message))
        // this.disconnect(producer)
        await producer.disconnect()
    }
}