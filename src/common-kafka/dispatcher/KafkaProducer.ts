import { CorrelationId } from '../CorrelationId'
import { KafkaService } from '../service/KafkaService'
import { InKafka } from '../service/InKafka'
import { Message } from '../Message'
import { deadLetter } from './DeadLetter'

export class KafkaProducer extends KafkaService implements InKafka {

    constructor(clientId: string, parse?: Function, groupId?: string) {
        super(clientId, parse, groupId)
    }

    public producer = async (topic: string, correlationid: CorrelationId, key: string, value: string): Promise<void> => {
        correlationid.continueWith("_"+topic)
        const kafka = this.kafka()
        const headers = new Message(correlationid, value)
        const producer = kafka.producer()
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
            catch(err => {
                deadLetter(headers, key, value)
            })
        await producer.disconnect()
    }
}
