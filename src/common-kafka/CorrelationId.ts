import { v4 as uuid } from 'uuid';

export class CorrelationId {
    private _id: string;

    constructor(title: string) {
        this._id = title + `(${uuid()})`
    }

    public continueWith(title: string) {
        this._id = this._id + `-${title}`
    }

}