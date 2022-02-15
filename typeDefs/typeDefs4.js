//  درس التوجيهات Directives
const { gql } = require('apollo-server-express')

const typeDefs = gql`

    directive @upper on FIELD_DEFINITION

    type User {
        id: ID!
        name: String! @upper
        email: String! @upper
        mobile: String!@deprecated(reason: "Use Email Enstead")
        age: Int!
        isGraduated: Boolean 
        image: Image
        cumulativeGPA: Float!
        gender: Gender!
        friends(cumulativeGPA: Float = 50.0 @deprecated): [Friend!]!
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