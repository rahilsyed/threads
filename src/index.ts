import express from 'express';
import { RequestHandler } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';

const startServer = async () => {
  const PORT = process.env.PORT || 4000;
  const app = express();

  const gqlServer = new ApolloServer({
    typeDefs: `
      type Query {
        hello: String!
        say(name : String):String
      }
    `,
    resolvers: {
      Query: {
        hello: () => `hello world graphql server`,
        say: (_, { name }: { name: String }) => `hey ${name}, nfjknsfjdnf`,
      },
    },
  });

  await gqlServer.start();

  // Apply GraphQL middleware with required middleware inline
  app.use('/graphql', cors(), express.json(), expressMiddleware(gqlServer));

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
};

startServer().catch((error) => {
  console.error('Error starting server:', error);
});
