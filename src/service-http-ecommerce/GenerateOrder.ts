import { v4 as uuid } from 'uuid';
import { KafkaProducer } from "../common-kafka/KafkaProducer"

export const GenerateOrder = (req, res) => {
    const clientId: string = GenerateOrder.name + `-${uuid()}`
    const service = new KafkaProducer(clientId)
    try {
        service.producer('SEND_MESSAGE_TO_ALL_USERS', 'USER_GENERATE_READING_REPORT', 'USER_GENERATE_READING_REPORT');
        console.log("Set generete reports to all usres")
        res.status(200).send('Report requests Generated')
    } catch (error) {
        console.error(error)
    }
}