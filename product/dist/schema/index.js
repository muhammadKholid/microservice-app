"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const Product_1 = __importDefault(require("./Product"));
const Product_2 = __importDefault(require("../models/Product"));
const producer_kafka_1 = require("../utils/producer.kafka");
// Queries
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        // Query to get all users
        products: {
            type: (0, graphql_1.GraphQLList)(Product_1.default),
            resolve: async () => {
                try {
                    const products = await Product_2.default.find();
                    return products.map((product) => ({
                        ...product.toObject(),
                        id: product._id,
                        createdAt: product.createdAt.toISOString(), // Format createdAt as ISO 8601
                        updatedAt: product.updatedAt.toISOString(), // Format createdAt as ISO 8601
                    }));
                }
                catch (error) {
                    throw new Error(error.message);
                }
            },
        },
        // Query to get a user by ID
        product: {
            type: Product_1.default,
            args: { id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) } },
            resolve: async (_, args) => {
                try {
                    const product = await Product_2.default.findById(args.id);
                    return {
                        ...product.toObject(),
                        id: product._id,
                        createdAt: product.createdAt.toISOString(),
                        updatedAt: product.updatedAt.toISOString(),
                    };
                }
                catch (error) {
                    throw new Error(error.message);
                }
            },
        },
    },
});
// Mutations
const Mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        // Mutation to add a new product
        addProduct: {
            type: Product_1.default,
            args: {
                name: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                description: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                status: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLBoolean) },
            },
            resolve: async (_, args) => {
                try {
                    // Destructure password
                    const { ...others } = args;
                    const product = new Product_2.default({
                        ...others,
                    });
                    (0, producer_kafka_1.run)(product);
                    return await product.save();
                }
                catch (error) {
                    throw new Error(error.message);
                }
            },
        },
        // Mutation to update a user by ID
        updateProduct: {
            type: Product_1.default,
            args: {
                id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                name: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                description: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                status: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLBoolean) },
            },
            resolve: async (_, args) => {
                try {
                    return await Product_2.default.findByIdAndUpdate(args.id, args, { new: true });
                }
                catch (error) {
                    throw new Error(error.message);
                }
            },
        },
        // Mutation to delete a user by ID
        deleteUser: {
            type: Product_1.default,
            args: { id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) } },
            resolve: async (_, args) => {
                try {
                    return await Product_2.default.findByIdAndDelete(args.id);
                }
                catch (error) {
                    throw new Error(error.message);
                }
            },
        },
    },
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
//# sourceMappingURL=index.js.map