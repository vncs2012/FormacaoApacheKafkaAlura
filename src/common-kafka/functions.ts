import { CorrelationId } from "./CorrelationId";

export const routeCorrelationId = (data: CorrelationId, className: string): CorrelationId => {
    // const continueWith = data._id 
    const continueWith = data.id
    const correlationId = new CorrelationId(className)
    correlationId.continueWith(continueWith)
    return correlationId
}