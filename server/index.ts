import 'reflect-metadata';
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import schema from './Schema/schema';

export let client;
const PORT = process.env.PORT || 4000;
(async () => {
  const app = express();

  const apolloServer = new ApolloServer({
    schema: schema,
    context: ({req, res}) => ({req, res}),
  });

  await apolloServer.applyMiddleware({app, cors: true});

  app.listen(PORT, () => {
    console.log('express server started');
  });
})();
