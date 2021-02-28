import { routeCorrelationId } from "../functions"
import { KafkaService } from "../service/KafkaService"
import { Message } from "../Message"


export const deadLetter = async (message: Message, key: string, value: string): Promise<void> => {
    const kafka = new KafkaService('deadLetter').kafka()
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
            console.log(err)
            process.exit(1)
        })
        await deadletter.disconnect()
        
}