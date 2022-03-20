//  درس المعاملات Arguments
const { users } = require('../mock_data')
const resolvers = {
    Gender: {
        MALE: "male",
        FEMALE: "female"
    },
    Query: {
        users: () => users,
        usersCount: () => users.length,
        cumulativeGPAs: ()=> users.map(user => user.cumulativeGPA),
        usersByGender: (parent, args, context, info) => users.filter(user => user.gender == args.gender),

        usersWithAgeBetween: (_, { min, max }) => users.filter(user => {
            max = max || 60
            return user.age > min && user.age < max
        }).map(user => user.name),

        getUserById: (parent, { id }, context, info) => users.find( user => user.id == id),

        getUsersByGenderAndCumulativeGPA: (_, { gender, cumulativeGPA}) => users.filter(
            user => user.gender == gender && user.cumulativeGPA >= cumulativeGPA
        ),
        getUsersByName: (_, args) => users.filter(user => user.name == args.name),
        graduatedUsers: () => users.filter(user => user.isGraduated),
        getUsersByFriendsNumber: (_, { friendsNumber }) => users.filter(user => user.friends.length == friendsNumber),
        getImages: (_, args) => {
            const images = users.map(user => user.image)
            return images.filter(i => i.height == args.height && i.width == args.width)
        }
    },

    User: {
        friends: (parent, args, context, info) =>  parent.friends.filter(
            friend => friend.cumulativeGPA >= args.cumulativeGPA
        )
    }
}


module.exports = { resolvers }