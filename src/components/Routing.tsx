import React from 'react'
import { AuthResponse } from 'msal'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import NavBar from './NavBar/NavBar';
import Welcome from '../pages/Welcome';
import Calendar from '../pages/Calendar'
import People from '../pages/People'
import 'bootstrap/dist/css/bootstrap.css';

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

        </Container>
      </div>
    </Router>
  )
}

export default Routing