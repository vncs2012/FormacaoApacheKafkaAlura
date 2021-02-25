import { CorrelationId } from "./CorrelationId";

export class Message {

    protected id: CorrelationId
    protected payload: any
    constructor(id: CorrelationId, payload: any) {
        this.id = id
        this.payload = payload
    }

    public get getMessage(): string {
        return JSON.stringify({
            id: this.id,
            payload: this.payload
        })
    }
    public get getCorrelationId(): CorrelationId {
        return this.id
    }
}