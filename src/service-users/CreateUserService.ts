import { v4 as uuid } from 'uuid';
import { consumerService } from "../common-kafka/consumer/ConsumerService";
import { ServiceFactory } from "../common-kafka/consumer/ServiceFactory";
import { ServiceRunner } from "../common-kafka/consumer/ServiceRunner";
import { connect } from "../common-database/Connect";
import { User } from './user.model';

export class CreateUserService implements ServiceFactory<CreateUserService>, consumerService<CreateUserService> {

    private nameClass = CreateUserService.name
    public main(): void {
        new ServiceRunner(this.create(CreateUserService)).start(1)
    }

    getConsumerGroup(): string {
        return this.nameClass
    }

    getTopic(): string {
        return 'ECOMMERCE_NEW_ORDER'
    }

    create(type: new (...args: any[]) => CreateUserService, ...args: any[]): consumerService<CreateUserService> {
        return new type(...args)
    }

    parse(topic, partition, message): void {
        const dataObject = JSON.parse(message.value)
        const dataJson = message.value
        var email = dataObject.email
        User.findOne({ email }).then(user => {
            if (user) {
                console.log('existing user')
            } else {
                const newUser = new User()
                newUser.uuid = uuid()
                newUser.email = dataObject.email
                // console.log(newUser)
                newUser.save((err: any) => {
                    if (err) {
                        console.error
                    } else {
                        console.log(`New User insert ${newUser}`)
                    }
                })
            }
        }).catch(err => console.error(err))
    }
}
connect(new CreateUserService,'alura-kafka-user')