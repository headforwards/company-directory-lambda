import React from 'react'
import { AuthResponse } from 'msal'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Welcome from '../pages/Welcome';
import Calendar from '../pages/Calendar'
import People from '../pages/People'

interface RoutingProps {
  isAuthenticated: boolean
  accessToken: AuthResponse | null
  login(): any
  logout(): any
  errorMessage: any
  user: any
}

const Routing: React.SFC<RoutingProps> = ({ isAuthenticated, accessToken, login, logout, errorMessage, user }) => {

  return (
    <Router>
      <div>
        <NavBar
          isAuthenticated={isAuthenticated}
          authButtonMethod={isAuthenticated ? logout : login}
          user={user} />
        <div>
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
          {
            isAuthenticated ? (<Route exact path="/people"
              render={(props) =>
                <People
                  accessToken={accessToken}
                />
              }
            />) : (
                null
              )
          }

        </div>
      </div>
    </Router>
  )
}

export default Routing