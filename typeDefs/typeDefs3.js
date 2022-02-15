//  درس المعاملات Arguments
const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        mobile: String! 
        age: Int!
        isGraduated: Boolean 
        image: Image
        cumulativeGPA: Float!
        gender: Gender!
        friends(cumulativeGPA: Float = 50.0): [Friend!]!
    }

    enum Gender {
        MALE 
        FEMALE
    }

    type Friend {
        name: String!
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
        usersCount: Int
        cumulativeGPAs: [Float]
        usersByGender(gender: Gender): [User]
        usersWithAgeBetween(min: Int!, max: Int): [String]
        getUserById(id: ID!): User
        getUsersByGenderAndCumulativeGPA(gender: Gender!, cumulativeGPA: Float!): [User]
        getUsersByName(name: String!): [User]
        graduatedUsers: [User] 
        getUsersByFriendsNumber(friendsNumber: Int!): [User]
    }
`

module.exports = { typeDefs }