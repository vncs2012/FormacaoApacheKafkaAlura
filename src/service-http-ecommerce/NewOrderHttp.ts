import { v4 as uuid } from 'uuid';
import { CorrelationId } from '../common-kafka/CorrelationId';
import { KafkaProducer } from "../common-kafka/dispatcher/KafkaProducer"
import { Order } from "./Order"


export const NewOrderHttp = (req, res) => {
    const nameClass: string = NewOrderHttp.name
    const service = new KafkaProducer(nameClass)
    try {
        let email: string = req.query.email
        let amount: number = req.query.amount
        
        const order = new Order(uuid(), amount, email)
        const id = new CorrelationId(nameClass)
        
        service.producer('ECOMMERCE_NEW_ORDER', id, email, JSON.stringify(order));
        
        console.log("New order sent Successfully")
        
        res.status(200).send('New order sent')
    
    } catch (error) {
        console.error(error)
    }
}