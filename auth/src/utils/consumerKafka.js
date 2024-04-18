import { Kafka } from 'kafkajs';
import { client } from '../elasticSearch/server.client.js';
// import { v4 as uuidv4 } from 'uuid';
// import { File } from '../models/File.js';

const kafka = new Kafka({
    clientId: 'my-microservice-app',
    // brokers: ['kafka-cntr:29092', 'localhost:29092']
    brokers: ['localhost:29092']
})
const consumer = kafka.consumer({ groupId: 'kafka2' })

export const run = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: 'product-topic', fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ message }) => {
            console.log("****************** Arrived in Consumer ******************")
            const obj = JSON.parse(message.value);
            console.log("our object", obj);
            //this part to create our user file
            try {

                // const body = [];
                // const esAction = {
                //     index: {
                //         _index: 'products',
                //         _type: 'product'
                //     }
                // };
                // body.push(esAction)
                // body.push({
                //     id: obj.id,
                //     name: obj.name,
                //     description: obj.description,
                // })
                const result = await client.index({
                    index: 'products',
                    type: 'category',
                    body: {
                        id: obj._id,
                        name: obj.name,
                        description: obj.description,
                    }
                });
                console.log(result);
                // const newFile = new File({
                //     userRef: uuidv4(),
                //     username: obj.username,
                // });
                // const response = await newFile.save();
                // if (response) {
                //     console.log("File created successfully")
                //     console.log("Executing wihout problems")
                // }
                return obj
            } catch (e) {
                console.log("catch : " + e)
            }
        },
    })
}