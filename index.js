const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const express = require('express')
const { createServer } = require('http')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { upperDirectiveTransformer } = require('./directives/uppercase')
const { WebSocketServer } = require ('ws');
const { useServer } = require('graphql-ws/lib/use/ws');

const { typeDefs } = 
//require('./typeDefs/typeDefs1')
// require('./typeDefs/typeDefs2')
// require('./typeDefs/typeDefs3')
// require('./typeDefs/typeDefs4')
// require('./typeDefs/typeDefs5')
// require('./typeDefs/typeDefs6-1')
// require('./typeDefs/typeDefs6-2')
require('./typeDefs/typeDefs7')
//require('./typeDefs/typeDefs8')

const { resolvers } = 
//require('./resolvers/resolvers1')
// require('./resolvers/resolvers2')
// require('./resolvers/resolvers3')
// require('./resolvers/resolvers4')
// require('./resolvers/resolvers5')
// require('./resolvers/resolvers6-1')
// require('./resolvers/resolvers6-2')
require('./resolvers/resolvers7')
//require('./resolvers/resolvers8')


const jwt = require('jsonwebtoken');
const JWT_SECRET = 'f1BtnWgD3VKY';
const { users } = require('./mock_data.js');

async function startApolloServer(typeDefs, resolvers) {
    const app = express()
    const httpServer = createServer(app)

    let schema = makeExecutableSchema({
        typeDefs,
        resolvers
    })

    schema = upperDirectiveTransformer(schema, 'upper')

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql',
    })

    const serverCleanup = useServer(        { schema, execute, subscribe }        , wsServer)
    const server = new ApolloServer({
        schema,
        plugins: [
          // Proper shutdown for the HTTP server.
          ApolloServerPluginDrainHttpServer({ httpServer }),
    
          // Proper shutdown for the WebSocket server.
          {
            async serverWillStart() {
              return {
                async drainServer() {
                  await serverCleanup.dispose();
                },
              };
            },
          },
        ],
        context: ({ req }) => {
            const auth = req ? req.headers.authorization : null 
            try{
                const decodedToken = jwt.verify(auth.slice(4), JWT_SECRET)
                const user = users.find(user => user.id == decodedToken.id)
                return { user }
            }catch(err){
                return null
            }
        }
      });
   

    await server.start()
    server.applyMiddleware({ app })
    await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve))
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    return { server, app }
}

startApolloServer(typeDefs, resolvers)