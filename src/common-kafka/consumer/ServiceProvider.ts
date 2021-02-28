import { consumerService } from "./ConsumerService";
import { kafkaConsumer } from "./kafkaConsumer";

export class ServiceProvider<T>  {

    private factory: consumerService<T>

    constructor(factory: consumerService<T>) {
        this.factory = factory;
    }

    public call(): void {
        var myService = this.factory
        try {
            let groupId = myService.getConsumerGroup()
            const service = new kafkaConsumer(groupId, myService.parse, groupId)
            service.consumer(myService.getTopic())
        } finally {}
    }

}