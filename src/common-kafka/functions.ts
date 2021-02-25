import { CorrelationId } from "./CorrelationId";

export const routeCorrelationId = (data: any, className: string): CorrelationId => {
    const continueWith = data._id
    const correlationId = new CorrelationId(className)
    correlationId.continueWith(continueWith)
    return correlationId
}