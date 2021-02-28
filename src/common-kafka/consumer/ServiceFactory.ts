import { consumerService } from './ConsumerService'

export interface ServiceFactory<T> {
    create(type: { new(...args): T }, ...args): consumerService<T>
}
