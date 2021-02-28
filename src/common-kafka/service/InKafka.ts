import { Consumer, Producer } from "kafkajs";
import { CorrelationId } from "../CorrelationId";

export interface InKafka {
    consumer?(topic: string | RegExp): Promise<void>
    producer?(topic: string, correlationid: CorrelationId, key: string, value: string): Promise<void>
    disconnect(servico: Consumer | Producer): any
}