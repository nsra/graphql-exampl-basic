//درس الطفرات Mutations     
const { gql } = require('apollo-server-express')

const typeDefs = gql`

    directive @upper on FIELD_DEFINITION

    type User {
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
        getUserById(id: ID!): User
    }

    input UserInput {
        name: String!
        email: String!
        gender: Gender!
        cumulativeGPA: Float!
        mobile: String!
        isGraduated: Boolean!
        friends: [FriendInput!]!
        age: Int!
        image: ImageInput!
    }

    type Mutation {
        createUser( newUser: UserInput! ): User

        addFriend(
            userId: ID!
            newFriend: FriendInput!
        ): [Friend]

        updateUserEmail(userId: ID!, email: String!): User

        setImage(userId: ID!, imageUpdate: ImageInput!): User
        setName(userId: ID!, newName: String!): User

        deleteUser(id: ID!): [User]
        removeFriend(userId: ID!, friendEmail: String!): [Friend]
    }

    input FriendInput {
        name: String! 
        email: String!
        gender: Gender!
        mobile: String!
        cumulativeGPA: Float!
    }

    input ImageInput{
        name: String!
        height: Int!
        width: Int!
    }
`

module.exports = { typeDefs }