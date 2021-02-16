import { CorrelationId } from './CorrelationId'
import { InKafka } from './InKafka'
import { KafkaService } from './KafkaService'
import { Message } from './Message'

export class KafkaProducer extends KafkaService implements InKafka {

    constructor(clientId: string, parse?: Function, groupId?: string) {
        super(clientId, parse, groupId)
    }

    public async producer(topic: string, correlationid: CorrelationId, key: string, value: string): Promise<void> {
        const kafka = this.kafka()
        const headers = new Message(correlationid, value)
        const producer = kafka.producer()
        // const admin = kafka.admin()
        // await admin.describeCluster() .then(ap => console.log(`describeCluster - `, ap))
        // await admin.listGroups() .then(ap => console.log(`listGroups - `, ap))
        // await admin.listTopics() .then(ap => console.log(`listTopics - `, ap))
        await producer.connect()
        await producer.send({
            topic: topic,
            messages: [
                {
                    key: key, value: value,
                    headers: {
                        'correlationid': headers.getMessage,
                    },
                },
            ],
        })
            .then(ap => console.log(`Sucesso - `, ap)).
            catch(err => console.log(err.message))
        // this.disconnect(producer)
        await producer.disconnect()
    }
}