import mongoose from "mongoose";

export const connect = async (servico: any, database: string) => {
    const db = "mongodb://localhost:27017/" + database
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