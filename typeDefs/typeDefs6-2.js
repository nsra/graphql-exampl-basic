// درس التخطيطات Schemas والأنواع  Types - الاتحادات Unions  
const { gql } = require('apollo-server-express')

const typeDefs = gql`

    type Author {
        id: ID!
        name: String!
    }

    type Book {
        id: ID! 
        title: String!
    }

    union SearchResult = Book | Author 

    type Query {
      search(contains: String!): [SearchResult]
    }
`

module.exports = { typeDefs }