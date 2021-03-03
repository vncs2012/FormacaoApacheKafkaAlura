import { CorrelationId } from '../common-kafka/CorrelationId';
import { KafkaProducer } from "../common-kafka/dispatcher/KafkaProducer";
import { Order } from "./Order";
import { OrderM } from './Order.model';


export const NewOrderHttp = async (req, res) => {
    const nameClass: string = NewOrderHttp.name
    const service = new KafkaProducer(nameClass)
    try {
        const { email, amount, uuid } = req.query
        if (await insertOrder(uuid)) {

            const order = new Order(uuid.toString(), amount, email)
            const id = new CorrelationId(nameClass)

            service.producer('ECOMMERCE_NEW_ORDER', id, email, JSON.stringify(order));

            console.log("New order sent Successfully")

            res.status(200).send('New order sent')
        } else {
            console.log("not success")
            res.status(200).send('not success')
        }
    } catch (error) {
        console.error(error)
    }
}
const wasPorecessed = async (uuid: string): Promise<OrderM> => {
    return await OrderM.findOne({ uuid })
}

const insertOrder = async (uuid: string): Promise<boolean> => {
    const uuidExiste = await wasPorecessed(uuid)
    if ((uuidExiste !== null) && (uuidExiste.uuid === uuid)) {
        return false
    }
    const newOrder = new OrderM()
    newOrder.uuid = uuid
    return (await newOrder.save()).uuid === uuid
}