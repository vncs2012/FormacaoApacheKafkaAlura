import { Kafka, logLevel} from 'kafkajs'
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

    kafka() {
        return new Kafka({
            clientId: this.clientId,
            brokers: ['localhost:9092'],
            logLevel: logLevel.INFO

        })
    }

    disconnect(servico: any) {
        servico.disconnect()
    }
}
