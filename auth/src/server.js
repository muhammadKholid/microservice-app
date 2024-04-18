import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import config from 'config';
import cors from 'cors';
import connectDB from './utils/connectDB.js';
import typeDefs from './schemas/index.js';
import app from './app.js';
import { Mutation, Query } from './resolvers/index.js';
import DateTime from './resolvers/datetime.js';
import getAuthUser from './middleware/authUser.js';
import { run } from './utils/consumerKafka.js';
import { client } from './elasticSearch/server.client.js';

const httpServer = http.createServer(app);

const corsOptions = {
    origin: ['https://studio.apollographql.com', 'http://localhost:8000'],
    credentials: true,
};

app.use(cors(corsOptions));

const resolvers = {
    DateTime,
    Query,
    Mutation,
};

(async function () {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        context: async ({ req, res }) => ({ req, res, getAuthUser }),
    });

    // CONNECT DB
    await connectDB();

    // subscribe to kafka
    await run();

    client.ping({
        requestTimeout: 30000,
    }, function (error) {
        error
            ? console.error('ElasticSearch cluster is down!')
            : console.log('ElasticSearch is ok');
    });

    // START APOLLO SERVER
    await server.start();

    server.applyMiddleware({ app, cors: corsOptions });

    const port = config.get('port');

    await new Promise((resolve) => httpServer.listen(port, '0.0.0.0', resolve));
    console.log(
        `?Server started at http://localhost:${port}${server.graphqlPath}`
    );
})();

process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION ?? Shutting down...');
    console.error('Error?', err.message);

    httpServer.close(async () => {
        process.exit(1);
    });
});

