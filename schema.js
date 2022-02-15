const graphql = require('graphql')
const users= [
  {
    name: "Arto Hellas",
    mobile: "040-123543",
    email: "ArtoHellas@gmail.com",
    isGraduated: true
  },
  {
    name: "Matti Luukkainen",
    mobile: "040-432342",
    email: "MattiLuukkainen@gmail.com",
    isGraduated: true
  },
  {
    name: "Venla Ruuska",
    email: "VenlaRuuska@gmail.com",
    isGraduated: false
  },
]

const User = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    name: { type: graphql.GraphQLString },
    mobile: { type: graphql.GraphQLString },
    email: { type: graphql.GraphQLString },
    isGraduated: { type: graphql.GraphQLBoolean }
  }
})

const Query = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    userByMobile: {
      type: User,
      args: {
        mobile: { type: graphql.GraphQLString }
      },
      resolve: (_, { mobile }) => users.find(user => user.mobile === mobile)
    }
  }
})

const schema = new graphql.GraphQLSchema({
  query: Query 
})

module.exports = schema
