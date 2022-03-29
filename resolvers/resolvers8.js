//درس المصادقة Authentication      
const { users } = require('../mock_data')
const { UserInputError, AuthenticationError } = require('Apollo-server-express')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'f1BtnWgD3VKY'
const resolvers = {
   Gender: {
      MALE: 'male',
      FEMALE: 'female',
   },

   Mutation: {
      createUser: (_, args, context) => {
         if(!context.user) return new AuthenticationError("يجب تسجيل دخولك بنجاح")
         if(users.find(user => user.email === args.email)){
             throw new Error("المستخدم موجود بالفعل")
         }
         const user = { ...args, id: users.length + 1 }
         users = users.concat(user)
         return user
      }, 
      login: async (_, args, context) => {
         const user = await users.find(user => user.email == args.email)
         if (!user || args.mobile != user.mobile) {
            throw new UserInputError("مدخلات خاطئة", { invalidArgs: args.mobile })
         }
         const userForToken = {
            email: user.email,
            id: user.id
         }
         return {
            tokenValue: jwt.sign(userForToken, JWT_SECRET)
         }
      }
   },
   Query: {
      users: (_, __, context) =>  {
         if(!context.user) return new AuthenticationError("يجب تسجيل دخولك بنجاح")   
         return users
      }
   }
}
module.exports = { resolvers }