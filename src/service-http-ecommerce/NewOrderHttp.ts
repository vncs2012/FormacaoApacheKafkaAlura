import { v4 as uuid } from 'uuid';
import { CorrelationId } from '../common-kafka/CorrelationId';
import { KafkaProducer } from "../common-kafka/KafkaProducer"
import { Order } from "./Order"


export const NewOrderHttp = (req, res) => {
    const nameClass: string = NewOrderHttp.name + `-${uuid()}`
    const service = new KafkaProducer(nameClass)
    try {
        let email: string = req.query.email
        let amount: number = req.query.amount
        const order = new Order(uuid(), amount, email)
        service.producer('ECOMMERCE_NEW_ORDER', new CorrelationId(nameClass), email, JSON.stringify(order));
        var emailCode = "Thank you for your order! We are processing your order!";
        service.producer("ECOMMERCE_SEND_EMAIL", new CorrelationId(nameClass), email, emailCode);
        console.log("New order sent Successfully")
        res.status(200).send('New order sent')
    } catch (error) {
        console.error(error)
    }
}