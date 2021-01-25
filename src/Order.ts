export class Order {
    private orderId: string;
    private userId: string;
    private amount: number;
    private email: string;
    
    constructor(orderId: string, userId: string, amount: number, email: string) {
        this.orderId = orderId
        this.userId = userId
        this.amount = amount
        this.email = email
    }
}
