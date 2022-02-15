//  درس الاستعلامات Queries

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
        males: () => users.filter(user => user.gender == "male"),
        over25YearsOld: () => users.filter(user => user.age > 25).map(user => user.name),
        firstUser: () => users.find( user => user.id == 1),
        excellentMaleUsers: () => users.filter(user => user.gender == "male" && user.cumulativeGPA >= 90),
        mohammadUsers: () => users.filter(user => user.name == "Mohammad"),
        graduatedUsers: () => users.filter(user => user.isGraduated),
        hasMore2Friends: () => users.filter(user => user.friends.length > 2)
    }
}

module.exports = { resolvers }