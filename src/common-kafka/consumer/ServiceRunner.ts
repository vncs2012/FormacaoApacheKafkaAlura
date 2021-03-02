import { consumerService } from "./ConsumerService";
import { ServiceProvider } from "./ServiceProvider";

export class ServiceRunner<T> {

    private provider: ServiceProvider<T>

    constructor(factory: consumerService<T>) {
        this.provider = new ServiceProvider(factory)
    }

    public start(threadCount: Number): void {
        for (let index = 0; index < threadCount; index++) {
            this.provider.call()      
        }
    }
}
