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

import Login from './users/pages/Login'
import Logout from './users/pages/Logout'
import ViewUser from './users/pages/ViewUser'

import NewPieceImage from './pieces/pages/NewPieceImage'
import NewPiece from './pieces/pages/NewPiece'

import AdminViewPieces from './pieces/pages/AdminViewPieces'
import AdminViewPiece from './pieces/pages/AdminViewPiece'
import AdminUpdatePiece from './pieces/pages/AdminUpdatePiece'
import AdminViewUsers from './users/pages/AdminViewUsers'
import AdminViewUser from './users/pages/AdminViewUser'
import AdminUpdateUser from './users/pages/AdminUpdateUser'
import AdminRemoveUser from './users/pages/AdminRemoveUser'
import AdminViewScans from './scans/pages/AdminViewScans'
import AdminViewScan from './scans/pages/AdminViewScan'

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
      <PublicRoute restricted={true} component={Login} path="/" exact />
      <PrivateRoute component={Logout} path="/admin/logout" exact />

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

      <PrivateRoute component={AdminViewPieces} path="/admin/pieces" exact />
      <PrivateNoNavRoute
        component={AdminViewPiece}
        path="/admin/pieces/:pieceId"
        exact
      />
      <PrivateNoNavRoute
        component={AdminUpdatePiece}
        path="/admin/pieces/:pieceId/edit"
        exact
      />
      <PrivateRoute component={AdminViewScans} path="/admin/pickups" exact />
      <PrivateNoNavRoute
        component={AdminViewScan}
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
        component={AdminRemoveUser}
        path="/admin/users/:username/remove"
        exact
      />
      <PrivateNoNavRoute
        component={AdminUpdateUser}
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
