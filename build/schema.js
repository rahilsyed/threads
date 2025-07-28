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
const schema_1 = require("@graphql-tools/schema");
const axios_1 = __importDefault(require("axios"));
const typeDefs = `
    type User{
      id: ID!,
      name:String!,
      username:String!,
      email: String!,
      phone: String!
      website: String!
    }
    type Todo{
      userId:ID!,
      id: ID!,
      title : String!,
      completed : String!
      user: User
    }
    type Post{
      id:ID!
      userId: ID!,
      title: String!,
      body: String!,
      user: User
    }
    type Query{
    getTodos: [Todo!]!
    getAllUsers:[User!]!
    getPosts: [Post!]!
    getPostsById(id:ID!): Post
    }
    
  
`;
const resolvers = {
    Todo: {
        user: (todo) => __awaiter(void 0, void 0, void 0, function* () {
            return (yield axios_1.default.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data;
        })
    },
    Post: {
        user: (post) => __awaiter(void 0, void 0, void 0, function* () {
            return (yield axios_1.default.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`)).data;
        }),
    },
    Query: {
        getPosts: () => __awaiter(void 0, void 0, void 0, function* () { return (yield axios_1.default.get(`https://jsonplaceholder.typicode.com/posts`)).data; }),
        getTodos: () => __awaiter(void 0, void 0, void 0, function* () { return (yield axios_1.default.get('https://jsonplaceholder.typicode.com/todos')).data; }),
        getPostsById: (parent_1, _a) => __awaiter(void 0, [parent_1, _a], void 0, function* (parent, { id }) {
            return (yield axios_1.default.get(`https://jsonplaceholder.typicode.com/posts/${id}`))
                .data;
        }),
        getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () { return (yield axios_1.default.get('https://jsonplaceholder.typicode.com/users')).data; }),
    },
    // Mutation: {
    //   addBook: (
    //     _: any,
    //     args: { userID: string; title: string; author: string }
    //   ) => {
    //     const newBook: Book = {
    //       id: args.userID,
    //       title: args.title,
    //       author: args.author,
    //     };
    //     // books.push(newBook);
    //     return newBook;
    //   },
    // },
};
const schema = (0, schema_1.makeExecutableSchema)({
    typeDefs,
    resolvers,
});
exports.default = schema;
