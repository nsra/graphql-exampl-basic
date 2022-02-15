// درس التخطيطات Schemas والأنواع  Types - الواجهات Interfaces   
const users = [
 {
    "id":1,
    "name":"Magdalena",
    "email":"mgrewes0@chronoengine.com",
    "gender":"male",
    "mobile":"734-324-1043",
    "cumulativeGPA":92.1,
    "isGraduated":true,
    "friends":[
       {
          "name":"Magdalena",
          "email":"mgrewes0@chronoengine.com",
          "gender":"male",
          "mobile":"734-324-1043",
          "cumulativeGPA":92.1
       },
       {
          "name":"Harman",
          "email":"hgaspero2@1688.com",
          "gender":"male",
          "mobile":"158-265-8979",
          "cumulativeGPA":87.9
       },
       {
          "name":"Oliver",
          "email":"ocourtliff4@spotify.com",
          "gender":"female",
          "mobile":"500-958-5193",
          "cumulativeGPA":67.9
       }
    ],
    "age":28,
    "image" : {"name":"ghklk.png", "height": 50 , "width":30},
    "idea": "auction",
    "grantedAmount": 12000
 },
 {
    "id":2,
    "name":"Lyndell",
    "email":"lgilbee1@google.com.br",
    "gender":"male",
    "mobile":"165-705-3521",
    "cumulativeGPA":90.6,
    "isGraduated":false,
    "friends":[
       {
          "name":"Magdalena",
          "email":"mgrewes0@chronoengine.com",
          "gender":"male",
          "mobile":"734-324-1043",
          "cumulativeGPA":92.1
       },
       {
          "name":"Harman",
          "email":"hgaspero2@1688.com",
          "gender":"male",
          "mobile":"158-265-8979",
          "cumulativeGPA":87.9
       },
       {
          "name":"Oliver",
          "email":"ocourtliff4@spotify.com",
          "gender":"female",
          "mobile":"500-958-5193",
          "cumulativeGPA":67.9
       }
    ],
    "age":23,
    "image" : {"name":"ghklk.png", "height": 50, "width":30},
    "idea": "e-collage",
    "grantedAmount": 0
 },
 {
    "id":3,
    "name":"Harman",
    "email":"hgaspero2@1688.com",
    "gender":"male",
    "mobile":"158-265-8979",
    "cumulativeGPA":87.9,
    "isGraduated":false,
    "friends":[
       {
          "name":"Magdalena",
          "email":"mgrewes0@chronoengine.com",
          "gender":"male",
          "mobile":"734-324-1043",
          "cumulativeGPA":92.1
       },
       {
          "name":"Harman",
          "email":"hgaspero2@1688.com",
          "gender":"male",
          "mobile":"158-265-8979",
          "cumulativeGPA":87.9
       },
       {
          "name":"Oliver",
          "email":"ocourtliff4@spotify.com",
          "gender":"female",
          "mobile":"500-958-5193",
          "cumulativeGPA":67.9
       },
       {
          "name":"Rod",
          "email":"romoylanem@omniture.com",
          "gender":"male",
          "mobile":"487-863-3754",
          "cumulativeGPA":83.3
       }
    ],
    "age":26,
    "image" : {"name":"ghrtlk.png", "height": 51, "width":31},
    "idea": "book shop",
    "grantedAmount": 18000
 },
 {
   "id":4,
   "name":"Inna",
   "email":"igummie3@blinklist.com",
   "gender":"male",
   "mobile":"832-900-3701",
   "cumulativeGPA":86.8,
   "isGraduated":true,
   "friends":[
      {
         "name":"Magdalena",
         "email":"mgrewes0@chronoengine.com",
         "gender":"male",
         "mobile":"734-324-1043",
         "cumulativeGPA":92.1
      },
      {
         "name":"Harman",
         "email":"hgaspero2@1688.com",
         "gender":"male",
         "mobile":"158-265-8979",
         "cumulativeGPA":87.9
      },
      {
         "name":"Oliver",
         "email":"ocourtliff4@spotify.com",
         "gender":"female",
         "mobile":"500-958-5193",
         "cumulativeGPA":67.9
      }
   ],
   "age":22,
   "image" : {"name":"ghklk.png", "height": 52, "width":32},
   "idea": "sponge factory",
   "grantedAmount": 0
 },
]

const resolvers = {
    Gender: {
        MALE: "male",
        FEMALE: "female"
    },
    Query: {
        users: () => users,
        grantedBeforeUsers: () => users.filter(user => user.grantedAmount >0),
        usersWithFirstParticipation: () => users.filter(user => user.grantedAmount == 0)
    },

    User: {
        __resolveType(parent, args, context, info){
            if(parent.grantedAmount > 0 )
                return "GrantedBeforeUser"
            else 
                return "UserWithFirstParticipation"
        }
    }
}

module.exports = { resolvers }