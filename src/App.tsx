import React, { useState } from 'react';
import config from './Config'
import { UserAgentApplication } from 'msal'
import { getUserDetails } from './GraphService'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import NavBar from './components/NavBar/NavBar';
import Welcome from './pages/Welcome';
import Calendar from './pages/Calendar'
import People from './pages/People'
import ErrorMessage, { ErrorMessageProps } from './components/ErrorMessage';
import 'bootstrap/dist/css/bootstrap.css';
import ApolloClient from 'apollo-boost'


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

  let signedInUser = userAgentApplication.getAccount();
  let graphApiAccessToken: string
  // let apolloClient: ApolloClient<any>

  const [isAuthenticated, setAuthenticated] = useState(signedInUser !== null)
  const [user, setUser] = useState({})
  const [error, setError] = useState<ErrorMessageProps | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)

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
      // apolloClient = await getApolloClient(graphApiAccessToken)
      
    }
    catch (err) {
      var errParts = err.toString().split('|');
      setAuthenticated(false)
      setError({ message: errParts[1], debugProp: errParts[0] })
      setUser({})
    }
  }

  async function logout() {
    userAgentApplication.logout()
  }

  async function getUserProfile() {
    try {
      // Get the access token silently
      // If the cache contains a non-expired token, this function
      // will just return the cached token. Otherwise, it will
      // make a request to the Azure OAuth endpoint to get a token

      var token = await userAgentApplication.acquireTokenSilent({
        scopes: config.scopes
      });

      console.log('Access Token: ')
      console.log(token.accessToken)


      if (token) {
        const user = await getUserDetails(token)
        setAuthenticated(true)
        setUser({
          displayName: user.displayName,
          email: user.email || user.userPrincipalName
        })
        setError(null)
        // graphApiAccessToken = token.accessToken
        console.log(`AccessToken from thingy: ${graphApiAccessToken}`)
        setAccessToken(token.accessToken)
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

  // async function getApolloClient(accessToken: string) {
  //   return new ApolloClient({
  //     uri: 'http://localhost:4000',
  //     request: (operation) => {
  //       operation.setContext({
  //         headers: {
  //           authorization: accessToken ? accessToken : ''
  //         }
  //       })
  //     }
  //   })
  // }

  return (
    <Router>
      <div>
        <NavBar
          isAuthenticated={isAuthenticated}
          authButtonMethod={isAuthenticated ? logout : login}
          user={user} />
        <Container>
          {errorMessage}
          <Route exact path="/"
            render={(props) =>
              <Welcome {...props}
                isAuthenticated={isAuthenticated}
                user={user}
                authButtonMethod={login}
              />
            } />
          <Route exact path="/calendar"
            render={(props) =>
              <Calendar
              />
            }
          />
          {isAuthenticated ? (
          <Route exact path="/people"
            render={(props) =>
              <People accessToken={accessToken}
              />
            }
          />
          ) : ( 
            <div>Go Away</div>
          )
          }
        </Container>
      </div>
    </Router>
  );
  function setErrorMessage(message: string, debug: string) {
    setError({
      message: message, debugProp: debug
    });
  }
}

export default App;