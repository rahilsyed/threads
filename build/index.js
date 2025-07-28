"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express5_1 = require("@as-integrations/express5");
const cors_1 = __importDefault(require("cors"));
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const PORT = process.env.PORT || 4000;
    const app = (0, express_1.default)();
    const gqlServer = new server_1.ApolloServer({
        typeDefs: `
      type Query {
        hello: String!
      }
    `,
        resolvers: {
            Query: {
                hello: () => `hello world`,
            },
        },
    });
    yield gqlServer.start();
    // Apply GraphQL middleware with required middleware inline
    app.use('/graphql', (0, cors_1.default)(), express_1.default.json(), (0, express5_1.expressMiddleware)(gqlServer));
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
});
startServer().catch(error => {
    console.error('Error starting server:', error);
});
