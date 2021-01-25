
import { KafkaService } from './KafkaService'
import { v4 as uuid } from 'uuid';
import { Order } from './Order';

class NewOrder {
    public main(): void {
        const clientId: string = NewOrder.name + uuid();
        const service = new KafkaService(clientId)
        for (let index = 0; index < 2; index++) {
            const order = new Order(uuid(), uuid(), 12.2, 'vncs2012@gmail.com')
            let key: string = uuid()
            service.producer('ECOMMERCE_NEW_ORDER', key, JSON.stringify(order));
            var email = "Thank you for your order! We are processing your order!";
            service.producer("ECOMMERCE_SEND_EMAIL", key, email);
        }
    }
}

new NewOrder().main()

