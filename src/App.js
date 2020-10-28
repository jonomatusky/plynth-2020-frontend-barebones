import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import { Box } from '@material-ui/core'
import { LastLocationProvider } from 'react-router-last-location'

import SignIn from './users/pages/SignIn'
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
import { useAuth } from './shared/hooks/auth-hook'
import { AuthContext } from './shared/context/auth-context'
import firebase from './firebase'

import ErrorBar from './shared/components/notifications/Error'
import MessageBar from './shared/components/notifications/Message'
import NavBar from './shared/components/navigation/NavBar'

firebase.analytics()

const App = () => {
  let routes
  const { token, login, logout, authStatus } = useAuth()

  const PrivateRoute = ({ component: Component, noNav, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props => (
          <>
            {authStatus === 'authenticated' && (
              <React.Fragment>
                {!noNav && <NavBar />}
                <main>
                  <Component {...props} />
                  {!noNav && <Box height="5rem" />}
                </main>
              </React.Fragment>
            )}
            {authStatus === 'unauthenticated' && <Redirect to="/" />}
          </>
        )}
      />
    )
  }

  const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props => (
          <>
            {(authStatus === 'unauthenticated' || !restricted) && (
              <main>
                <Component {...props} />
              </main>
            )}
            {authStatus === 'authenticated' && restricted && (
              <Redirect to="/admin/users" />
            )}
          </>
        )}
      />
    )
  }

  routes = (
    <Switch>
      <PublicRoute restricted={true} component={SignIn} path="/" exact />

      <PrivateRoute
        component={NewPieceImage}
        path="/admin/create/style"
        noNav
        exact
      />
      <PrivateRoute
        component={NewPiece}
        path="/admin/create/piece"
        noNav
        exact
      />

      <PrivateRoute component={AdminViewPieces} path="/admin/pieces" exact />
      <PrivateRoute
        component={AdminViewPiece}
        path="/admin/pieces/:pieceId"
        noNav
        exact
      />
      <PrivateRoute
        component={AdminUpdatePiece}
        path="/admin/pieces/:pieceId/edit"
        noNav
        exact
      />
      <PrivateRoute component={AdminViewScans} path="/admin/pickups" exact />
      <PrivateRoute
        component={AdminViewScan}
        path="/admin/pickups/:scanId"
        noNav
        exact
      />
      <PrivateRoute component={AdminViewUsers} path="/admin/users" exact />
      <PrivateRoute
        component={AdminViewUser}
        path="/admin/users/:username"
        noNav
        exact
      />
      <PrivateRoute
        component={AdminRemoveUser}
        path="/admin/users/:username/remove"
        noNav
        exact
      />
      <PrivateRoute
        component={AdminUpdateUser}
        path="/admin/users/:username/edit"
        noNav
        exact
      />

      <Redirect from="/admin" to="/" />

      <PublicRoute restricted={false} component={ViewUser} path="/:username" />

      <Redirect to="/" />
    </Switch>
  )

  return (
    <AuthContext.Provider
      value={{
        token: token,
        login: login,
        logout: logout,
        authStatus: authStatus,
      }}
    >
      <Router>
        <LastLocationProvider>
          <>
            <ErrorBar />
            <MessageBar />
            {routes}
          </>
        </LastLocationProvider>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
