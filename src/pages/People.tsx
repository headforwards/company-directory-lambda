import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import config from '../Config';
import { getPeople } from '../GraphService';
import Avatar from '../components/Avatar'
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types'
import ApolloClient, { gql } from 'apollo-boost'
import PeopleList from '../components/PeopleList';
import { ApolloProvider } from '@apollo/react-hooks';

interface PeopleProps {
    accessToken: string | null
}

const People: React.SFC<PeopleProps> = ({ accessToken }) => {

    const [token, setToken] = useState<any>(null)
    // const [client, setClient] = useState<ApolloClient<any> | null>(null)

    // let apolloClient:any = null

    // useEffect(() => {
    //     const syncToken = getToken()

    // }), [token]

    // useEffect(() => {
    const apolloClient = new ApolloClient({
        uri: '/.netlify/functions/graphql',
        request: (operation) => {
            operation.setContext({
                headers: {
                    authorization: accessToken ? accessToken : ''
                }
            })
        }
    })
    // setClient(apolloClient)
    // }), [client]

    const getToken = async () => {
        const response = await (window as any).msal.acquireTokenSilent({
            scopes: config.scopes
        });
        setToken(response.accessToken)
        console.log(`Token: ${token}`)
        return response.accesToken
    }

    return (
        <div>
            <h1>People</h1>
            {!!accessToken ? (
                <ApolloProvider client={apolloClient}>
                    <PeopleList />
                </ApolloProvider>
            ) : (
                    <div> Logged Out </div>
                )}
        </div>
    );



    // const client = new ApolloClient({
    //     uri: 'http://localhost:4000',
    //     request: (operation) => {
    //         operation.setContext({
    //             headers: {
    //                 authorization: token ? token.accessToken : ''
    //             }
    //         })
    //     }
    // })
    // const [people, updatePeople] = useState<MicrosoftGraph.Person[]>([])
    // const [accessToken, setAccessToken] = useState('')

    // useEffect(() => {

    //     // const client = new ApolloClient({
    //     //     uri: 'http://localhost:4000',
    //     // })

    //     // client.query({
    //     //     query: gql`
    //     //     {
    //     //         users {
    //     //             displayName
    //     //         }
    //     //     }
    //     //     `
    //     // })
    //     // .then(result => console.log(result))

    //     async function getPeopleData() {

    //         const token = await (window as any).msal.acquireTokenSilent({
    //             scopes: config.scopes
    //         });

    //         const client = new ApolloClient({
    //             uri: 'http://localhost:4000',
    //             request: (operation) => {
    //                 operation.setContext({
    //                     headers: {
    //                         authorization: token ? token.accessToken : ''
    //                     }
    //                 })
    //             }
    //         })

    //         client.query({
    //             query: gql`
    //             {
    //                 users {
    //                     displayName
    //                 }
    //             }
    //             `
    //         })
    //             .then(result => console.log(result))

    //         // try {
    //         //     // Get the user's access token
    //         //     const token = await (window as any).msal.acquireTokenSilent({
    //         //         scopes: config.scopes
    //         //     });

    //         //     setAccessToken(token)

    //         //     var peopleData = await getPeople(token);
    //         //     // Update the array of events in state
    //         //     updatePeople(peopleData.value);
    //         // }
    //         // catch (err) {
    //         //     // this.props.showError('ERROR', JSON.stringify(err));
    //         // }
    //     }
    //     // if (people !== []) {
    //     getPeopleData()
    //     // }
    // }, [])




    // return (

    //     <div>
    //         {/* <ApolloProvider client={client}> */}
    //             <h1>People</h1>

    //             {/* <PeopleList/>  */}
    //             {/* <Table>
    //             <thead>
    //                 <tr>
    //                     <th scope="col">ID</th>
    //                     <th scope="col">Name</th>
    //                     <th scope="col">Photo</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {people.map(
    //                     (person: MicrosoftGraph.Person) => {
    //                         return (
    //                             <tr key={person.id}>
    //                                 <td>{person.id}</td>
    //                                 <td>{person.displayName}</td>
    //                                 <td><Avatar userId={person.id} accessToken={accessToken} displayName={person.displayName} /></td>
    //                             </tr>
    //                         );
    //                     })}
    //             </tbody>
    //         </Table> */}
    //         {/* </ApolloProvider> */}
    //     </div>

    // );

}

export default People