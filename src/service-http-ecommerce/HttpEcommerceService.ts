import express from "express";
import { NewOrderHttp } from "./NewOrderHttp";

class HttpEcommerceService {

    public main() {
        const app = express()
        const port = 3000
        app.get('/', (req, res) => {
            res.send('Hello World!')
        })
        app.get('/new', NewOrderHttp)
        
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        })
    }
}

new HttpEcommerceService().main()