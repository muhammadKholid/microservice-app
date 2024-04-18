"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const ProductType = new graphql_1.GraphQLObjectType({
    name: "Product",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        isAdmin: { type: graphql_1.GraphQLBoolean },
        createdAt: { type: graphql_1.GraphQLString },
        updatedAt: { type: graphql_1.GraphQLString },
    }),
});
exports.default = ProductType;
//# sourceMappingURL=Product.js.map