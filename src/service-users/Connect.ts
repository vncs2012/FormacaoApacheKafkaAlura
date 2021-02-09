import mongoose from "mongoose";
import { BatchSendMessagemService } from "./BatchSendMessagemService";
import { CreateUserService } from "./CreateUserService";

export const connect = async (servico: BatchSendMessagemService | CreateUserService) => {
    const db = "mongodb://localhost:27017/alura-kafka-user"
    mongoose.connect(db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(() => {
        servico.main()
        return console.log(`Successfully connected to ${db}`);
    }).catch(error => {
        console.log("Error connecting to database: ", error);
        return process.exit(1);
    });
};