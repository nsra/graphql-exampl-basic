// درس العمليات Operations
const { users } = require('../mock_data')

const resolvers = {
    Query: {
        users: () => users
    }
}

module.exports = { resolvers }