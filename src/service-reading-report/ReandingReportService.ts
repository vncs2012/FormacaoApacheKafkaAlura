import { kafkaConsumer } from '../common-kafka/kafkaConsumer';

class ReandingReportService {
    private nameClass = ReandingReportService.name
    public main(): void {
        const service = new kafkaConsumer(this.nameClass, this.parse, this.nameClass)
        service.consumer('ECOMMERCE_USER_GENERATE_READING_REPORT')
    }

    private parse(topic, partition, message): void {
        const dataObject = JSON.parse(message.value)
        const dataJson = message.value
        console.log(`Processing report for -> ${dataJson}`)
        //Implementar o processo de criar PDF com uuid
    }
}
new ReandingReportService().main()


