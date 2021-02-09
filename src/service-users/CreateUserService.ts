import mongoose, { connect as inibanco } from "mongoose";
import { kafkaConsumer } from "../common-kafka/kafkaConsumer"
import { User } from './user.model'
import { v4 as uuid } from 'uuid';
import { connect } from "./Connect";

export class CreateUserService {
    private nameClass = CreateUserService.name
    public main(): void {
        const service = new kafkaConsumer(this.nameClass, this.parse, this.nameClass)
        service.consumer('ECOMMERCE_NEW_ORDER')
    }

    private parse(topic, partition, message): void {
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
connect(new CreateUserService)
// const connect = async () => {
//     const db = "mongodb://localhost:27017/alura-kafka-user"
//     mongoose.connect(db, {
//         useUnifiedTopology: true,
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false
//     }).then(() => {
//         new CreateUserService().main()
//         return console.log(`Successfully connected to ${db}`);
//     }).catch(error => {
//         console.log("Error connecting to database: ", error);
//         return process.exit(1);
//     });
// };
// connect()