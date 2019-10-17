import React, { useState } from 'react';
import config from './Config'
import { UserAgentApplication } from 'msal'
import { getUserDetails } from './MSGraphService'
import Routing from './components/Routing'
import ErrorMessage, { ErrorMessageProps } from './components/ErrorMessage';
import getAccessToken from './utils/authutils'
// import { ApolloClient } from 'apollo-client'
// import { createHttpLink } from 'apollo-link-http'
// import { setContext } from 'apollo-link-context'
// import {InMemoryCache} from 'apollo-cache-inmemory'

import ApolloClient from 'apollo-boost'

import { ApolloProvider } from '@apollo/react-hooks';



const App: React.SFC = () => {

  const userAgentApplication = new UserAgentApplication({
    auth: {
      clientId: config.appId
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: true
    }
  });

  // let apolloClientNoAuth: ApolloClient<any> = new ApolloClient({
  //   uri: '/.netlify/functions/graphql',
  //   request: (operation) => {
  //     const token = 'SOMESTRING' // localStorage.getItem('token')
  //     operation.setContext({
  //       headers: {
  //         authorization: token ? token : ''
  //       }
  //     })
  //   }
  // })

  let signedInUser = userAgentApplication.getAccount();

  const [isAuthenticated, setAuthenticated] = useState(signedInUser !== null)
  const [user, setUser] = useState({})
  const [error, setError] = useState<ErrorMessageProps | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [apolloClient, setApolloClient] = useState<ApolloClient<any>>()

  let errorMessage = null;
  if (error) {
    errorMessage = <ErrorMessage message={error.message} debugProp={error.debugProp} />;
  }

  async function login() {
    try {
      await userAgentApplication.loginPopup(
        {
          scopes: config.scopes,
          prompt: "select_account"
        });
      await getUserProfile()
    } catch (err) {
      var errParts = err.toString().split('|');
      setAuthenticated(false)
      setError({ message: errParts[1], debugProp: errParts[0] })
      setUser({})
    }
  }

  async function logout() {
    userAgentApplication.logout()
  }

  async function getAToken() {
    return userAgentApplication.acquireTokenSilent({
      scopes: config.scopes
    });
  }
  async function getUserProfile() {
    try {
      // Get the access token silently
      // If the cache contains a non-expired token, this function
      // will just return the cached token. Otherwise, it will
      // make a request to the Azure OAuth endpoint to get a token

      let token = await getAToken()

      if (token) {
        console.log(`Token: `)
        console.log(token)
        const user = await getUserDetails(token)
        setAuthenticated(true)
        setUser({
          displayName: user.displayName,
          email: user.email || user.userPrincipalName
        })
        setError(null)
        setAccessToken(token.accessToken)
        const apolloClientWithAuth = new ApolloClient({
          uri: '/.netlify/functions/graphql',
          request: (operation) => {

            operation.setContext({
              headers: {
                authorization: token ? token.accessToken : ''
              }
            })
          }
        })
        setApolloClient(apolloClientWithAuth)

        //TODO Create a new ApolloClient with the accessToken and set update the provider

      }
    }
    catch (err) {
      let error = { message: '', debugProp: '' }
      if (typeof (err) === 'string') {
        var errParts = err.split('|');
        error = errParts.length > 1 ?
          { message: errParts[1], debugProp: errParts[0] } :
          { message: err, debugProp: '' };
      } else {
        error = {
          message: err.message,
          debugProp: JSON.stringify(err)
        }
      }

      setAuthenticated(false)
      setError(error)
      setUser({})
    }
  }


  return (
    <>
      {isAuthenticated && !!apolloClient ? (
        <ApolloProvider client={apolloClient}>
          <Routing
            isAuthenticated={isAuthenticated}
            logout={logout}
            login={login}
            errorMessage={errorMessage}
            user={user}
          />
        </ApolloProvider>
      ) : (

          <Routing
            isAuthenticated={isAuthenticated}
            logout={logout}
            login={login}
            errorMessage={errorMessage}
            user={user}
          />

        )}

    </>
      
    
  );
function setErrorMessage(message: string, debug: string) {
  setError({
    message: message, debugProp: debug
  });
}
}

export default App;