import { Kafka, logLevel } from 'kafkajs'
import { routeCorrelationId } from './functions'
import { InKafka } from './InKafka'
import { Message } from './Message'

export class KafkaService implements InKafka {
    protected parse: Function
    protected clientId: string
    protected groupId: string

    constructor(clientId: string, parse?: Function, groupId?: string) {
        this.parse = parse
        this.clientId = clientId
        this.groupId = groupId
    }

    kafka(): Kafka {
        return new Kafka({
            clientId: this.clientId,
            brokers: ['localhost:9092', 'localhost:9095', 'localhost:9098'],
            logLevel: logLevel.ERROR

        })
    }

    disconnect(servico: any) {
        servico.disconnect()
    }
    protected deadLetter = async (message: Message, key: string, value: string): Promise<void> => {
        const kafka = this.kafka()
        const correlationId = routeCorrelationId(message.getCorrelationId, 'DeadLetter')
        const deadletter = kafka.producer()
        await deadletter.connect()
        await deadletter.send({
            topic: '"ECOMMERCE_DEADLETTER"',
            messages: [
                {
                    key: key, value: value,
                    headers: {
                        'correlationid': JSON.stringify(correlationId),
                    },
                },
            ],
        })
            .then(ap => console.log(`Sucesso - `, ap)).
            catch(err => {
                process.exit(1)
            })
        await deadletter.disconnect()
    }
}
