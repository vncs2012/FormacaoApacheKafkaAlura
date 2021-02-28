
export interface consumerService<T> {
    parse(topic: string | RegExp, partition: any, message: any): void
    getConsumerGroup(): string
    getTopic(): string

}