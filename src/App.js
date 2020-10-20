import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box } from '@material-ui/core'
import { LastLocationProvider } from 'react-router-last-location'

import { authWithToken, logout } from './redux/authSlice'
import { fetchPieces } from './redux/piecesSlice'
import jwt from 'jsonwebtoken'

import NewPieceImage from './pieces/pages/NewPieceImage'
import NewPiece from './pieces/pages/NewPiece'
import ViewPiece from './pieces/pages/ViewMyPiece'
import MyPieces from './pieces/pages/MyPieces'
import UpdatePiece from './pieces/pages/UpdatePiece'
import MyProfile from './users/pages/MyProfile'
import UpdateProfile from './users/pages/UpdateProfile'
import NewPickup from './scans/pages/NewScan'
import UserSignup1 from './signup/pages/UserSignup1'
import UserSignup2 from './signup/pages/UserSignup2'
import SignupSuccess from './signup/pages/SignupSuccess'
import Login from './users/pages/Login'
import LoggedOutScan from './scans/pages/LoggedOutScan'
import LoggedInScan from './scans/pages/LoggedInScan'
import BetaSignup from './users/pages/BetaSignup'
import ViewUser from './users/pages/ViewUser'
import UpdateEmail from './users/pages/UpdateEmail'
import UpdatePassword from './users/pages/UpdatePassword'
import UpdateUsername from './users/pages/UpdateUsername'
import RecoverPassword from './users/pages/RecoverPassword'
import ResetPassword from './users/pages/ResetPassword'
import ContactSupport from './users/pages/ContactSupport'
import Logout from './users/pages/Logout'

import NavBar from './shared/components/navigation/NavBar'

const App = () => {
  const { token } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  let routes

  useEffect(() => {
    dispatch(authWithToken())
    dispatch(fetchPieces())
  }, [dispatch])

  useEffect(() => {
    if (!!token) {
      const { exp } = jwt.decode(token) || {}
      if (exp * 1000 > new Date()) {
        dispatch(logout)
      }
    }
  }, [dispatch, token])

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          token ? (
            <React.Fragment>
              <NavBar />
              <main>
                <Component {...props} />
                <Box height="5rem" />
              </main>
            </React.Fragment>
          ) : (
            <Redirect to="/" />
          )
        }
      />
    )
  }

  const PrivateNoNavRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          token ? (
            <React.Fragment>
              <main>
                <Component {...props} />
              </main>
            </React.Fragment>
          ) : (
            <Redirect to="/" />
          )
        }
      />
    )
  }

  const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    return (
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
    )
  }

  routes = (
    <Switch>
      <PublicRoute restricted={true} component={Login} path="/s/login" exact />

      <PublicRoute
        restricted={true}
        component={BetaSignup}
        path="/s/subscribe"
        exact
      />

      <PublicRoute
        restricted={false}
        component={RecoverPassword}
        path="/s/recover"
        exact
      />

      <PublicRoute
        restricted={false}
        component={ResetPassword}
        path="/s/reset/:userId/:token"
        exact
      />

      <PublicRoute restricted={true} component={LoggedOutScan} path="/" exact />

      <PublicRoute
        restricted={true}
        component={UserSignup1}
        path="/signup"
        exact
      />

      <PublicRoute
        restricted={false}
        component={NewPickup}
        path="/pickup"
        exact
      />

      <PublicRoute
        path="/get-on-plynth"
        component={() => {
          window.location.href = 'https://site.plynth.com/get-on-plynth'
          return null
        }}
      />

      <PrivateNoNavRoute
        component={UserSignup2}
        path="/admin/get-started/profile"
        exact
      />
      <PrivateNoNavRoute
        component={SignupSuccess}
        path="/admin/get-started/success"
        exact
      />

      <PrivateNoNavRoute
        component={UpdateProfile}
        path="/admin/profile/edit"
        exact
      />

      <PrivateNoNavRoute
        component={NewPieceImage}
        path="/admin/create/style"
        exact
      />
      <PrivateNoNavRoute
        component={NewPiece}
        path="/admin/create/piece"
        exact
      />
      <PrivateNoNavRoute
        component={UpdatePiece}
        path="/admin/pieces/:pieceId/edit"
      />
      <PrivateNoNavRoute component={ViewPiece} path="/admin/pieces/:pieceId" />
      <PrivateRoute component={MyPieces} path="/admin/pieces" exact />
      <PrivateRoute component={LoggedInScan} path="/admin/pickup" exact />
      <PrivateNoNavRoute
        component={UpdateProfile}
        path="/admin/profile/edit"
        exact
      />
      <PrivateRoute component={MyProfile} path="/admin/profile" exact />
      <PrivateRoute
        component={UpdateEmail}
        path="/admin/profile/email/change"
        exact
      />
      <PrivateRoute
        component={UpdatePassword}
        path="/admin/profile/password/change"
        exact
      />
      <PrivateRoute
        component={UpdateUsername}
        path="/admin/profile/username/change"
        exact
      />
      <PrivateRoute
        component={ContactSupport}
        path="/admin/profile/help"
        exact
      />
      <PrivateRoute component={Logout} path="/admin/logout" exact />
      <Redirect from="/admin" to="/" />

      <PublicRoute restricted={false} component={ViewUser} path="/:username" />

      <Redirect to="/" />
    </Switch>
  )

  return (
    <Router>
      <LastLocationProvider>{routes}</LastLocationProvider>
    </Router>
  )
}

export default App
