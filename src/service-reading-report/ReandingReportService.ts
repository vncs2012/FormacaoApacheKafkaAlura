import { v4 as uuid } from 'uuid';
import { kafkaConsumer } from '../common-kafka/kafkaConsumer';

class ReandingReportService {
    public main(): void {
        const service = new kafkaConsumer(ReandingReportService.name + `-${uuid()}`, this.parse, ReandingReportService.name)
        service.consumer('USER_GENERATE_READING_REPORT')
    }

    private parse(topic, partition, message): void {
        const dataObject = JSON.parse(message.value)
        const dataJson = message.value
        console.log(`Processing report for -> ${dataJson}`)
        //Implementar o processo de criar PDF com uuid
    }
}
new ReandingReportService().main()


