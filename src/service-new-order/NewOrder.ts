import { v4 as uuid } from 'uuid';
import { Order } from './Order';
import { KafkaProducer } from '../common-kafka/KafkaProducer';

class NewOrder {
    public main(): void {
        const clientId: string = NewOrder.name + `-${uuid()}`
        const service = new KafkaProducer(clientId)
        for (let index = 0; index < 5; index++) {
            let email: string = `${Math.random()}@gmail.com`
            const order = new Order(uuid(), (Math.random() * (7000 - 2000) + 2000), email)
            service.producer('ECOMMERCE_NEW_ORDER', email, JSON.stringify(order));
            var emailCode = "Thank you for your order! We are processing your order!";
            service.producer("ECOMMERCE_SEND_EMAIL", email, emailCode);
        }
    }
}

new NewOrder().main()

