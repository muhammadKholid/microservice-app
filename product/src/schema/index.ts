import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean,
} from "graphql";
import ProductType from "./Product";
import Product from "../models/Product";
import { run } from "../utils/producer.kafka";

// Queries
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        // Query to get all users
        products: {
            type: GraphQLList(ProductType),
            resolve: async () => {
                try {
                    const products = await Product.find();
                    return products.map((product) => ({
                        ...product.toObject(),
                        id: product._id,
                        createdAt: product.createdAt.toISOString(), // Format createdAt as ISO 8601
                        updatedAt: product.updatedAt.toISOString(), // Format createdAt as ISO 8601
                    }));
                } catch (error) {
                    throw new Error(error.message);
                }
            },
        },

        // Query to get a user by ID
        product: {
            type: ProductType,
            args: { id: { type: GraphQLNonNull(GraphQLString) } },
            resolve: async (_, args) => {
                try {
                    const product = await Product.findById(args.id);
                    return {
                        ...product.toObject(),
                        id: product._id,
                        createdAt: product.createdAt.toISOString(),
                        updatedAt: product.updatedAt.toISOString(),
                    };
                } catch (error) {
                    throw new Error(error.message);
                }
            },
        },
    },
});

// Mutations
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        // Mutation to add a new product
        addProduct: {
            type: ProductType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                status: { type: GraphQLNonNull(GraphQLBoolean) },
            },

            resolve: async (_, args) => {
                try {
                    // Destructure password
                    const { ...others } = args;

                    const product = new Product({
                        ...others,
                    });

                    run(product);
                    return await product.save();
                } catch (error) {
                    throw new Error(error.message);
                }
            },
        },

        // Mutation to update a Product by ID
        updateProduct: {
            type: ProductType,
            args: {
                id: { type: GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                status: { type: GraphQLNonNull(GraphQLBoolean) },
            },
            resolve: async (_, args) => {
                try {
                    return await Product.findByIdAndUpdate(args.id, args, { new: true });
                } catch (error) {
                    throw new Error(error.message);
                }
            },
        },

        // Mutation to delete a product by ID
        deleteProduct: {
            type: ProductType,
            args: { id: { type: GraphQLNonNull(GraphQLString) } },
            resolve: async (_, args) => {
                try {
                    return await Product.findByIdAndDelete(args.id);
                } catch (error) {
                    throw new Error(error.message);
                }
            },
        },
    },
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});