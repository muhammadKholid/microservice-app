"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: 'my-microservice-app',
    //your kafka container port
    brokers: ['localhost:29092']
});
const producer = kafka.producer();
const run = async (data) => {
    await producer.connect();
    await producer.send({
        topic: 'product-topic',
        //convert value to a JSON string and send it
        messages: [{ value: JSON.stringify(data) }],
    });
    console.log('Message sent successfully', data);
};
exports.run = run;
//# sourceMappingURL=producer.kafka.js.map