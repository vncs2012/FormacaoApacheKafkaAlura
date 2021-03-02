import { v4 as uuid } from 'uuid';
import { CorrelationId } from '../common-kafka/CorrelationId';
import { KafkaProducer } from "../common-kafka/dispatcher/KafkaProducer"
import { Fraud } from '../service-fraud-detector/fraud.model';
import { Order } from "./Order"
import { OrderM } from './Order.model';


export const NewOrderHttp = (req, res) => {
    const nameClass: string = NewOrderHttp.name
    const service = new KafkaProducer(nameClass)
    try {
        const { email, amount, uuid } = req.query
        if (insertOrder(uuid)) {
            const order = new Order(uuid, amount, email)
            const id = new CorrelationId(nameClass)

            service.producer('ECOMMERCE_NEW_ORDER', id, email, JSON.stringify(order));

            console.log("New order sent Successfully")

            res.status(200).send('New order sent')
        }
    } catch (error) {
        console.error(error)
    }
}
const wasPorecessed = async (uuid: string): Promise<OrderM> => {
    return await OrderM.findOne({ uuid })
}

const insertOrder = async (id: string): Promise<boolean> => {
    if ((await wasPorecessed(id)).uuid === id) {
        return false
    }
    const newOrder = await new OrderM({ uuid: id, }).save()
    return newOrder.uuid === id
}