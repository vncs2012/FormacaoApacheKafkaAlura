export class Order {
    private orderId: string;
    private userId: string;
    private amount: number;
    private email: string;

    constructor(orderId: string, amount: number, email: string) {
        this.orderId = orderId
        this.amount = amount
        this.email = email
    }
    /**
     * amount
     */
    public getAmount() {
        return this.amount
    }
}
