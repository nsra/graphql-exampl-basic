//درس الطفرات Mutations     
let { users } = require('../mock_data')

const resolvers = {
    Gender: {
        MALE: "male",
        FEMALE: "female"
    },
    Query: {
        users: () => users,
        usersCount: () => users.length,
        getUserById: (parent, { id }, context, info) => users.find( user => user.id == id),
    },
    Mutation: { 
        createUser: (_, args) => {
            if(users.find(user => user.email === args.newUser.email)){
                throw new Error("المستخدم موجود بالفعل")
            }
            const user = { ...args.newUser, id: users.length + 1 }
            users = users.concat(user)
            return user
        }, 
        addFriend: (_, args) => {
            const user = users.find(user => user.id == args.userId)
            let userFriends = user.friends
            const friend = args.newFriend
            userFriends = userFriends.concat(friend)
            users= users.map( user => user.id == arg.userId ? {...user, friends: userFriends } : user)
            return userFriends
        }, 
        updateUserEmail: (_, args) => {
            if(users.find(user => user.email === args.email)){
                throw new Error("الايميل موجود مسبقًا لدينا")
            }
            const user = users.find(user => user.id == args.userId)
            const updatedUser = { ...user, email: args.email}
            users= users.map(user => user.id == args.userId ? updatedUser : user)
            return updatedUser
        },
        setImage: (_, args) => {
            const user = users.find(user => user.id == args.userId)
            const updateduser = { ...user, image: args.imageUpdate }
            users = users.map(user => user.id == args.userId ? updateduser : user)
            return updateduser
        },
        setName: (_, args) => {
            const user = users.find(user => user.id == args.userId)
            const updateduser = { ...user, name: args.newName }
            users = users.map(user => user.id == args.userId ? updateduser : user)
            return updateduser
        }, 
        deleteUser: (_, args) => {
            users = users.filter(user => user.id != args.id)
            return users 
        },
        removeFriend: (_, args) => {
            const user = users.find(user => user.id == args.userId)
            let userFriends = user.friends
            userFriends= userFriends.filter(friend => friend.email !== args.friendEmail)
            users = users.map(user => user.id == args.userId ? { ...user, friends: userFriends } : user)
            return userFriends
        }
    }
}

module.exports = { resolvers }