import { CorrelationId } from "../common-kafka/CorrelationId";
import { KafkaProducer } from "../common-kafka/dispatcher/KafkaProducer"

export const GenerateOrder = (req, res) => {
    const nameClass: string = GenerateOrder.name
    const service = new KafkaProducer(nameClass)
    try {
        const correlationId = new CorrelationId(nameClass)
        console.log(correlationId)
        service.producer('ECOMMERCE_SEND_MESSAGE_TO_ALL_USERS', correlationId, 'ECOMMERCE_USER_GENERATE_READING_REPORT', 'ECOMMERCE_USER_GENERATE_READING_REPORT');
        console.log("Set generete reports to all usres")
        res.status(200).send('Report requests Generated')
    } catch (error) {
        console.error(error)
    }
}