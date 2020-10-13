import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import jwt from 'jsonwebtoken'
import { Box } from '@material-ui/core'
import { LastLocationProvider } from 'react-router-last-location'

import { login, logout } from './redux/authSlice'
import { setPieces } from './redux/piecesSlice'
import { setUsers } from './redux/usersSlice'
import { useApiClient } from './shared/hooks/api-hook'

import NewPieceImage from './pieces/pages/NewPieceImage'
import NewPiece from './pieces/pages/NewPiece'
import ViewPiece from './pieces/pages/ViewPiece'
import MyPieces from './pieces/pages/AllPieces'
import UpdatePiece from './pieces/pages/UpdatePiece'
import MyProfile from './users/pages/MyProfile'
import UpdateProfile from './users/pages/UpdateProfile'
import NewPickup from './scans/pages/NewScan'
import UserSignup1 from './signup/pages/UserSignup1'
import UserSignup2 from './signup/pages/UserSignup2'
import SignupSuccess from './signup/pages/SignupSuccess'
import Login from './users/pages/Login'
import ViewScans from './scans/pages/ViewScans'
import ViewScan from './scans/pages/ViewScan'
import LoggedOutScan from './scans/pages/LoggedOutScan'
import LoggedInScan from './scans/pages/LoggedInScan'
import BetaSignup from './users/pages/BetaSignup'
import ViewUser from './users/pages/ViewUser'
import AdminViewUsers from './users/pages/AdminViewUsers'
import AdminViewUser from './users/pages/AdminViewUser'
import UpdateEmail from './users/pages/UpdateEmail'
import ChangePassword from './users/pages/ChangePassword'
import ChangeUsername from './users/pages/ChangeUsername'
import ContactSupport from './users/pages/ContactSupport'
import Logout from './users/pages/Logout'

import NavBar from './shared/components/navigation/NavBar'

const App = () => {
  const token = localStorage.getItem('userToken')
  const { sendRequest } = useApiClient()
  const dispatch = useDispatch()

  let routes

  useEffect(() => {
    const getUserAndPieces = async () => {
      try {
        const { exp } = jwt.decode(token)

        if (!!token && exp * 1000 > new Date()) {
          const { user } = await sendRequest('/users/me', 'GET', null, {
            Authorization: 'Bearer ' + token,
          })
          dispatch(login({ user, token }))

          const { pieces } = await sendRequest(`/pieces`, 'GET', null, {
            Authorization: 'Bearer ' + token,
          })
          dispatch(setPieces({ pieces }))

          const { users } = await sendRequest(`/users`, 'GET', null, {
            Authorization: 'Bearer ' + token,
          })
          dispatch(setUsers({ users }))
        } else {
          dispatch(logout())
          dispatch(setPieces({ pieces: null }))
          dispatch(setUsers({ users: null }))
        }
      } catch (err) {}
    }
    getUserAndPieces()
  }, [token, dispatch, sendRequest])

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
      <PrivateRoute component={ViewScans} path="/admin/pickups" exact />
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
        component={ChangePassword}
        path="/admin/profile/password/change"
        exact
      />
      <PrivateRoute
        component={ChangeUsername}
        path="/admin/profile/username/change"
        exact
      />
      <PrivateRoute
        component={ContactSupport}
        path="/admin/profile/help"
        exact
      />
      <PrivateRoute component={Logout} path="/admin/logout" exact />

      <PrivateNoNavRoute
        component={ViewScan}
        path="/admin/pickups/:scanId"
        exact
      />
      <PrivateRoute component={AdminViewUsers} path="/admin/users" exact />
      <PrivateNoNavRoute
        component={AdminViewUser}
        path="/admin/users/:username"
        exact
      />
      <PrivateNoNavRoute
        component={UpdatePiece}
        path="/admin/users/:username/edit"
        exact
      />

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
