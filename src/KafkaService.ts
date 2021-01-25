import { Kafka, logLevel, ResourcePatternTypes } from 'kafkajs'

export class KafkaService {
    private parse: Function
    private clientId: string
    private groupId: string

    constructor(clientId: string, parse?: Function, groupId?: string) {
        this.parse = parse
        this.clientId = clientId
        this.groupId = groupId

    }
    kafka() {
        return new Kafka({
            clientId: this.clientId,
            brokers: ['localhost:9092'],
            logLevel: logLevel.ERROR

        })
    }

    public async consumer(topic: string | RegExp): Promise<void> {
        const kafka = this.kafka()
        const consumer = kafka.consumer({ groupId: this.groupId })
        await consumer.connect()
        consumer.subscribe({ topic: topic, fromBeginning: true })
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                this.parse(topic, partition, message)
            }
        })
            .then(console.log)
            .catch(err => {
                console.log(err)
                this.disconnect(consumer)
            })
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
    private disconnect(servico) {
        servico.disconnect()
    }

}
