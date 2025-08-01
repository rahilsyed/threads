import { prismaClient } from '../lib/db';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { User } from './user';
import { typeDefs } from './user/typeDef';
async function createApolloServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `
    ${typeDefs}
      type Query {
        ${User.queries}
      }
      type Mutation {
      ${User.mutations}
      }
    `,
    resolvers: {
      Query: { ...User.resolvers.Queries },
      Mutation: { ...User.resolvers.Mutations },
    },
  });

  await gqlServer.start();
  return gqlServer;
}

export default createApolloServer;
