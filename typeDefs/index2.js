const express = require('express');
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { execute, subscribe } = require ('graphql');
const { SubscriptionServer } = require ('subscriptions-transport-ws');
const http = require('http');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'f1BtnWgD3VKY';
const { users } = require('./mock_data.js');

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const schema = require('./schema') 
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            }
          };
        }
      }
    ],
    context: ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      try{
        if (auth) {
          const decodedToken = jwt.verify(
            auth.slice(4), JWT_SECRET
          )
          const user = users.find(user => user.id == decodedToken.id);
          return { user };
        }
      }catch(err){
        return null
      }
    }
  });

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: server.graphqlPath }
  );

  await server.start();
  server.applyMiddleware({ app });
  await new Promise(resolve => httpServer.listen({ port: 4001 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`);
  return { server, app };
}
startApolloServer();
