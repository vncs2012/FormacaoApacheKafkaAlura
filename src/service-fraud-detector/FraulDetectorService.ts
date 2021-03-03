import { connect } from '../common-database/Connect';
import { consumerService } from '../common-kafka/consumer/ConsumerService';
import { ServiceFactory } from '../common-kafka/consumer/ServiceFactory';
import { ServiceRunner } from '../common-kafka/consumer/ServiceRunner';
import { KafkaProducer } from '../common-kafka/dispatcher/KafkaProducer';
import { routeCorrelationId } from '../common-kafka/functions';
import { Fraud } from './fraud.model';

class FraulDetectorService implements consumerService<FraulDetectorService>, ServiceFactory<FraulDetectorService> {

    private className: string = FraulDetectorService.name
    public main(): void {
        new ServiceRunner(this.create(FraulDetectorService)).start(1)
    }
    getConsumerGroup = (): string => {
        return this.className
    }
    getTopic = (): string => {
        return 'ECOMMERCE_NEW_ORDER'
    }
    create = (type: new (...args: any[]) => FraulDetectorService, ...args: any[]): consumerService<FraulDetectorService> => {
        return new type(...args)
    }
    parse = async (topic, partition, message): Promise<void> => {
        console.log('entrou')
        const dataObject = JSON.parse(message.value)
        const dataJson = message.value
        const uuid = dataObject.uuid
        console.log(await this.wasPorecessed(uuid))
        if (await this.wasPorecessed(uuid) === null) {
            let isFraud = dataObject.amount >= 4500
            const headers = JSON.parse(message.headers.correlationid)
            const correlationId = routeCorrelationId(headers.id, this.className)
            const producer = new KafkaProducer(this.className)

            if (isFraud) {
                this.insertFraud(uuid, true)
                console.log(`Order is Fraud -> value:${dataJson}`)
                producer.producer('ECOMMERCE_ORDER_REJECTED', correlationId, dataObject.email, dataJson)
            } else {
                this.insertFraud(uuid, false)
                console.log(`Approved:->${dataJson}`)
                producer.producer('ECOMMERCE_ORDER_APPROVED', correlationId, dataObject.email, dataJson)
            }
        }
    }
    private wasPorecessed = async (uuid: string): Promise<Fraud> => {
        return await Fraud.findOne({ fraud_id: uuid })
    }

    insertFraud = async (id: any, is_fraud: Boolean) => {
        const newFraud = new Fraud()
        newFraud.fraud_id = id
        newFraud.is_fraud = is_fraud
        console.log(newFraud)
        return await newFraud.save()
    }
}

connect(new FraulDetectorService, 'alura-kafka-fraul')


