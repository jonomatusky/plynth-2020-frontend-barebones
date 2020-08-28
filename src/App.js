import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import { useAuth } from './shared/hooks/auth-hook'
import { AuthContext } from './shared/context/auth-context'

import NewImage from './pieces/pages/NewImage'
import NewPiece from './pieces/pages/NewPiece'
import ViewPiece from './pieces/pages/ViewPiece'
import ViewPieces from './pieces/pages/MyPieces'
import UpdatePiece from './pieces/pages/UpdatePiece'
import Scans from './scans/pages/Scans'
import MyCollection from './pieces/pages/MyCollection'
import CardTest from './pieces/pages/CardTest'
import Demo from './test/Demo'
import SignUp from './users/pages/SignUp'
import Login from './users/pages/Login'
import LoggedOut from './scans/pages/LoggedOut'
import BetaSignup from './users/pages/BetaSignup'
import UserProfile from './users/pages/UserProfile'
import Logout from './users/pages/Logout'

import NavBar from './shared/components/Navigation/NavBar'

const App = () => {
  const { token, login, logout, userId } = useAuth()

  let routes

  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/">
          <NavBar />
        </Route>
        <main>
          <Switch>
            <Route path="/create" exact>
              <NewImage />
            </Route>
            <Route path="/create/piece" exact>
              <NewPiece />
            </Route>
            <Route path="/pieces/:pieceId/edit">
              <UpdatePiece />
            </Route>
            <Route path="/pieces/:pieceId">
              <ViewPiece />
            </Route>
            <Route path="/pieces" exact>
              <ViewPieces />
            </Route>
            <Route path="/pickup" exact>
              <LoggedOut />
            </Route>
            <Route path="/pickups" exact>
              <Scans />
            </Route>
            <Route path="/collection" exact>
              <MyCollection />
            </Route>
            <Route path="/test" exact>
              <CardTest />
            </Route>
            <Route path="/demo" exact>
              <Demo />
            </Route>
            <Route path="/users/:userId">
              <UserProfile />
            </Route>
            <Route path="/logout" exact>
              <Logout />
            </Route>
            <Redirect to="/pieces" />
          </Switch>
        </main>
      </React.Fragment>
    )
  } else {
    routes = (
      <main>
        <Switch>
          <Route path="/signup" exact>
            <BetaSignup />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/subscribe" exact>
            <BetaSignup />
          </Route>
          <Route path="/" exact>
            <LoggedOut />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>{routes}</Router>
    </AuthContext.Provider>
  )
}

export default App
