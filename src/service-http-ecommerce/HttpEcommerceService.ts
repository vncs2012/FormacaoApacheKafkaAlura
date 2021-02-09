import express from "express";
import { GenerateOrder } from "./GenerateOrder";
import { NewOrderHttp } from "./NewOrderHttp";

class HttpEcommerceService {

    public main() {
        const app = express()
        const port = 3000
        app.get('/', (req, res) => {
            res.send('Hello World!')
        })
        app.get('/new', NewOrderHttp)
        app.get('/admin/generete-report', GenerateOrder)
        
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        })
    }
}

new HttpEcommerceService().main()