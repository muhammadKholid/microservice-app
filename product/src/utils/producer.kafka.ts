import { Kafka } from "kafkajs"

const kafka = new Kafka({
    clientId: 'my-microservice-app',
    //your kafka container port
    brokers: ['localhost:29092']
})

const producer = kafka.producer()


export const run = async (data: any) => {

    await producer.connect();
    await producer.send({
        topic: 'product-topic',
        //convert value to a JSON string and send it
        messages: [{ value: JSON.stringify(data) }],


    });
    console.log('Message sent successfully', data)

}