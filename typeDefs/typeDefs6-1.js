// درس التخطيطات Schemas والأنواع  Types - الواجهات Interfaces   
const { gql } = require('apollo-server-express')

const typeDefs = gql`

    directive @upper on FIELD_DEFINITION

    interface User {
        id: ID!
        name: String! @upper
        email: String! 
        mobile: String!
        age: Int!
        isGraduated: Boolean 
        image: Image
        cumulativeGPA: Float!
        gender: Gender!
        friends: [Friend!]!
    }

    type GrantedBeforeUser implements User {
        id: ID!
        name: String! @upper
        email: String! 
        mobile: String!
        age: Int!
        isGraduated: Boolean 
        image: Image
        cumulativeGPA: Float!
        gender: Gender!
        friends: [Friend!]!
        idea: String!
        grantedAmount: Int
    }

    type UserWithFirstParticipation implements User {
        id: ID!
        name: String! @upper
        email: String! 
        mobile: String!
        age: Int!
        isGraduated: Boolean 
        image: Image
        cumulativeGPA: Float!
        gender: Gender!
        friends: [Friend!]!
        idea: String!
    }

    enum Gender {
        MALE 
        FEMALE
    }

    type Friend {
        name: String! @upper
        email: String!
        gender: Gender!
        mobile: String
        cumulativeGPA: Float!
    }

    type Image {
        name: String!
        height: Int!
        width: Int!
    }

    type Query {
        users: [User]
        usersWithFirstParticipation: [UserWithFirstParticipation]
        grantedBeforeUsers: [GrantedBeforeUser]
    }
`

module.exports = { typeDefs }