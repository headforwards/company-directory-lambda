import { ApolloServer, gql } from 'apollo-server-lambda'
import { RESTDataSource } from 'apollo-datasource-rest'


const typeDefs = gql`
type User {
    displayName: String
  }

  type Query {
    users: [User]
  }
`

const resolvers = {
    Query: {
        users: (_, __, { dataSources }) => dataSources.usersApi.getUsers()
    },
}

class UsersAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'https://graph.microsoft.com/v1.0/'
    }

    willSendRequest(request) {
        request.headers.set('Authorization', this.context.token)
    }
    async getUsers() {
        const data = await this.get(`users`)
        return data.value
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            usersApi: new UsersAPI()
        }
    },
    context: (req) => {
        return {
            token: req.event.headers.authorization 
        };
    },
});

const handler = server.createHandler()

export { handler }

