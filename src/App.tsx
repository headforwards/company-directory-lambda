import React, { useState } from 'react';
import config from './Config'
import { UserAgentApplication, AuthResponse } from 'msal'
import { getUserDetails } from './utils/MSGraphService'
import Routing from './components/Routing'
import ErrorMessage, { ErrorMessageProps } from './components/ErrorMessage';
import ApolloClient from 'apollo-client'
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ApolloProvider } from '@apollo/react-hooks';
import { TokenProvider } from './utils/TokenContext'

const App: React.SFC = () => {

  const userAgentApplication = new UserAgentApplication({
    auth: {
      clientId: config.appId,
      postLogoutRedirectUri: "https://www.headforwards.com"
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: true
    }
  });

  let signedInUser = userAgentApplication.getAccount();

  const httpLink = createHttpLink({
    uri: '/.netlify/functions/graphql',
  })

  const authLink = setContext((_, { headers }) => {
    return getAToken()
      .then((token) => {
        if (!graphToken) {
          setGraphToken(token)
        }
        return token.accessToken
      })
      .then((accessToken) => {
        return {
          headers: {
            ...headers,
            authorization: accessToken ? accessToken : "",
          }
        }
      })

  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true //TODO Hook this up to an Environment Variable
  })

  const [isAuthenticated, setAuthenticated] = useState(signedInUser !== null)
  const [user, setUser] = useState({})
  const [error, setError] = useState<ErrorMessageProps | null>(null)
  const [graphToken, setGraphToken] = useState<AuthResponse>()

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
        setGraphToken(token)
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
    <TokenProvider value={graphToken ? graphToken : null}>
      <ApolloProvider client={apolloClient}>
        <Routing
          isAuthenticated={isAuthenticated}
          accessToken={graphToken ? graphToken : null}
          logout={logout}
          login={login}
          errorMessage={errorMessage}
          user={user}
        />
      </ApolloProvider>
      </TokenProvider>
    </>


  );
  function setErrorMessage(message: string, debug: string) {
    setError({
      message: message, debugProp: debug
    });
  }
}

export default App;