import React from 'react'
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
import MyPieces from './pieces/pages/MyPieces'
import UpdatePiece from './pieces/pages/UpdatePiece'
import Scans from './scans/pages/Scans'
import MyCollection from './pieces/pages/MyCollection'
import CardTest from './pieces/pages/CardTest'
import Demo from './test/Demo'
// import SignUp from './users/pages/SignUp'
import Login from './users/pages/Login'
import LoggedOut from './scans/pages/LoggedOut'
import BetaSignup from './users/pages/BetaSignup'
import UserProfile from './users/pages/UserProfile'
import Logout from './users/pages/Logout'

import NavBar from './shared/components/Navigation/NavBar'

const App = () => {
  const { token, isLoading, login, logout, userId } = useAuth()

  let routes

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return !isLoading ? (
      <Route
        {...rest}
        render={props =>
          token ? (
            <React.Fragment>
              <NavBar />
              <main>
                <Component {...props} />
              </main>
            </React.Fragment>
          ) : (
            <Redirect to="/" />
          )
        }
      />
    ) : (
      <div></div>
    )
  }

  const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    return !isLoading ? (
      <Route
        {...rest}
        render={props =>
          !token || !restricted ? (
            <main>
              <Component {...props} />
            </main>
          ) : (
            <Redirect to="/admin/pieces" />
          )
        }
      />
    ) : (
      <div></div>
    )
  }

  routes = (
    <Switch>
      {/* <PublicRoute
        restricted={true}
        component={BetaSignup}
        path="/s/signup"
        exact
      /> */}
      <PublicRoute restricted={true} component={Login} path="/s/login" exact />
      <PublicRoute
        restricted={true}
        component={BetaSignup}
        path="/s/subscribe"
        exact
      />
      <PublicRoute restricted={true} component={LoggedOut} path="/" exact />

      <PrivateRoute component={NewImage} path="/admin/create" exact />
      <PrivateRoute component={NewPiece} path="/admin/create/piece" exact />
      <PrivateRoute
        component={UpdatePiece}
        path="/admin/pieces/:pieceId/edit"
      />
      <PrivateRoute component={ViewPiece} path="/admin/pieces/:pieceId" />
      <PrivateRoute component={MyPieces} path="/admin/pieces" exact />
      <PrivateRoute component={LoggedOut} path="/pickup" exact />
      <PrivateRoute component={Scans} path="/admin/pickups" exact />
      <PrivateRoute component={MyCollection} path="/admin/collection" exact />
      <PrivateRoute component={CardTest} path="/admin/test" exact />
      <PrivateRoute component={Demo} path="/admin/demo" exact />
      <PrivateRoute component={Logout} path="/admin/logout" exact />
      <Redirect from="/admin" to="/" />

      <PublicRoute
        restricted={false}
        component={UserProfile}
        path="/:username"
      />

      <Redirect to="/" />
    </Switch>
  )

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
