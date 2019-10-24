import { ApolloServer, gql } from 'apollo-server-lambda'
import { RESTDataSource } from 'apollo-datasource-rest'

const typeDefs = gql`
type User {
    id: ID!
    displayName: String
    givenName: String
    surname: String
    userType: String
    accountEnabled: Boolean
  }

  type Photo { 
    #   id: ID!
      photoData: String 
  }

  type Query {
    users: [User]
    user(id: ID!): User
    userPhoto(id: ID!): Photo
  }


`

const resolvers = {
    Query: {
        users: (_, __, { dataSources }) => dataSources.usersApi.getUsers(),
        user: (_, { id }, { dataSources }) => dataSources.usersApi.getUser(id),
        userPhoto: (_, { id }, { dataSources }) => dataSources.usersApi.getPhotoForUser(id)
    }

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
        const data = await this.get(`users?$filter=accountEnabled eq true and userType eq 'Member'&$select=id,accountEnabled,givenName,surname,displayname,userType`)
        return data.value
    }
    async getUser(id: string) {
        const data = await this.get(`users/${id}`)
        return data
    }
    async getPhotoForUser(id: string) {
        const data = await this.get(`users/${id}/photo/$value`)
        return {"photoData":data.toString()}
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

