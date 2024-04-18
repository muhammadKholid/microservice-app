"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const express_graphql_1 = require("express-graphql");
const schema_1 = __importDefault(require("./schema"));
dotenv_1.default.config();
app.use((0, morgan_1.default)("common"));
// USE HELMET AND CORS MIDDLEWARES
app.use((0, cors_1.default)({
    origin: ["*"], // Comma separated list of your urls to access your api. * means allow everything
    credentials: true, // Allow cookies to be sent with requests
}));
app.use((0, helmet_1.default)({
    contentSecurityPolicy: process.env.NODE_ENV === "production" ? undefined : false,
}));
app.use(express_1.default.json());
// DB CONNECTION
if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL environment variable is not defined");
}
mongoose_1.default
    .connect(process.env.MONGODB_URL)
    .then(() => {
    console.log("MongoDB connected to the backend successfully");
})
    .catch((err) => console.log(err));
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.default,
    graphiql: true,
}));
// Start backend server
const PORT = process.env.PORT || 8500;
app.listen(PORT, () => {
    console.log(`Backend server is running at port ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map