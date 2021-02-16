import { v4 as uuid } from 'uuid';
export class CorrelationId {
    private _id: string;

    public set id(value: string) {
        this._id = value;
    }

    constructor(title: string) {
        this._id = title + `(${uuid()})`
    }

    public get id(): string {
        return this._id;
    }


    public continueWith(title: string) {
        this._id = this._id + `-${title}`
    }

}