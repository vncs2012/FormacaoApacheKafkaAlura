import { Kafka, logLevel } from 'kafkajs'
import { InKafka } from './InKafka'

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
}
