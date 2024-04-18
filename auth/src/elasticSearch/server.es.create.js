import { client } from './server.client.js';
// import params from './es.setting-mapping.json';
// import * as fs from 'fs';
// const params = JSON.parse(fs.readFileSync('es.setting-mapping.json'));
// console.log(params);

(async function () {
    try {
        const index = 'product-index'
        const type = 'category'

        if (await client.indices.exists({ index })) {
            await client.indices.delete({ index })
        }

        await client.indices.create(
            {
                index,
            },
        );

        const schema = {
            id: {
                type: "keyword"
            },
            name: {
                type: "text"
            },
            description: {
                type: "text"
            },
        };

        await client.indices.putMapping({
            index,
            type,
            include_type_name: true,
            body: {
                properties: schema
            }
        })
    } catch (err) {
        console.log(err)
    }
})()