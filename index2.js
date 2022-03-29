const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const express = require('express')
const { createServer } = require('http')
const { upperDirectiveTransformer } = require('./directives/uppercase')
const { WebSocketServer } = require ('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'f1BtnWgD3VKY'
const { users } = require('./mock_data.js')

async function startApolloServer() {
    const app = express()
    const httpServer = createServer(app)
    let schema = require('./schema')
    schema = upperDirectiveTransformer(schema, 'upper')

    const wsServer = new WebSocketServer({
      server: httpServer,
      path: '/graphql',
    })

    const serverCleanup = useServer({ schema }, wsServer)

    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                  return {
                    async drainServer() {
                        serverCleanup.close()
                    }
                  }
                }
            }
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
    })

  
    await server.start()
    server.applyMiddleware({ app })
    await new Promise(resolve => httpServer.listen({ port: 4001 }, resolve))
    console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`)
}

startApolloServer()