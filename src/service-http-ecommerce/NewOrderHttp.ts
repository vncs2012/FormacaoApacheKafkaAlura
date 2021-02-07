import { v4 as uuid } from 'uuid';
import { KafkaProducer } from "../common-kafka/KafkaProducer"
import { Order } from "./Order"


export const NewOrderHttp = (req, res) => {
    const clientId: string = NewOrderHttp.name + `-${uuid()}`
    const service = new KafkaProducer(clientId)
    try {
        let email: string = req.query.email
        let amount: number = req.query.amount
        const order = new Order(uuid(), amount, email)
        service.producer('ECOMMERCE_NEW_ORDER', email, JSON.stringify(order));
        var emailCode = "Thank you for your order! We are processing your order!";
        service.producer("ECOMMERCE_SEND_EMAIL", email, emailCode);
        console.log("New order sent Successfully")
        res.status(200).send('New order sent')
    } catch (error) {
        console.error(error)
    }
}