import express from 'express';
import { RequestHandler } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';
import { prismaClient } from './lib/db';
import createApolloServer from './graphql';
  const startServer = async () => {
    const PORT = process.env.PORT || 4000;
    const app = express();
    
  app.use('/graphql', cors(), express.json(), expressMiddleware(await createApolloServer()));

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
};

startServer().catch((error) => {
  console.error('Error starting server:', error);
});
