import { v4 as uuid } from 'uuid';
import { Order } from './Order';
import { KafkaProducer } from '../common-kafka/dispatcher/KafkaProducer';
import { CorrelationId } from '../common-kafka/CorrelationId';

class NewOrder {
    public main(): void {
        const nameClass: string = NewOrder.name
        const service = new KafkaProducer(nameClass)
        for (let index = 0; index < 5; index++) {
           
            let email: string = `${Math.random()}@gmail.com`
            const order = new Order(uuid(), (Math.random() * (7000 - 2000) + 2000), email)
            const id = new CorrelationId(nameClass)
           
            service.producer('ECOMMERCE_NEW_ORDER', id, email, JSON.stringify(order));
        }
    }
}

new NewOrder().main()

