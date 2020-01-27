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

  type Group {
      id: ID!
  }


  type Query {
    users: [User]
    user(id: ID!): User
    userPhoto(id: ID!): Photo
    groups: [Group]
  }


`

const resolvers = {
    Query: {
        users: (_, __, { dataSources }) => dataSources.msGraphApi.getUsers(),
        user: (_, { id }, { dataSources }) => dataSources.msGraphApi.getUser(id),
        userPhoto: (_, { id }, { dataSources }) => dataSources.msGraphApi.getPhotoForUser(id),
        groups: (_, __, {dataSources}) => dataSources.msGraphApi.getGroups()
    }

}

class MSGraphAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'https://graph.microsoft.com/v1.0/'
    }

    willSendRequest(request) {
        request.headers.set('Authorization', this.context.token)
    }
    async getUsers() {
        const data = await this.get(`users?$top=250&$filter=accountEnabled eq true and userType eq 'Member'&$select=id,accountEnabled,givenName,surname,displayname,userType`)
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
    async getGroups() {
        const data = await this.get(`groups`)
        return data
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            msGraphApi: new MSGraphAPI()
        }
    },
    context: (req) => {
        console.log(`Auth Token: ${req.event.headers.authorization}`)
        return {
            token: req.event.headers.authorization
        };
    },
});

const handler = server.createHandler()

export { handler }

