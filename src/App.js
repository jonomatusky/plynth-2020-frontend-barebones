import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import { Box } from '@material-ui/core'
import { LastLocationProvider } from 'react-router-last-location'
import { useAuth } from './shared/hooks/auth-hook'
import { AuthContext } from './shared/context/auth-context'

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
import SignIn from './users/pages/SignIn'
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
// import Logout from './users/pages/Logout'

import ErrorBar from './shared/components/notifications/Error'
import MessageBar from './shared/components/notifications/Message'
import NavBar from './shared/components/navigation/NavBar'

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
            {authStatus === 'unauthenticated' && <Redirect to="/s/login" />}
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
              <Redirect to="/admin/pieces" />
            )}
          </>
        )}
      />
    )
  }

  routes = (
    <Switch>
      <PublicRoute restricted={true} component={SignIn} path="/s/login" exact />

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

      <PrivateRoute
        component={UserSignup2}
        path="/admin/get-started/profile"
        noNav
        exact
      />
      <PrivateRoute
        component={SignupSuccess}
        path="/admin/get-started/success"
        noNav
        exact
      />

      <PrivateRoute
        component={UpdateProfile}
        path="/admin/profile/edit"
        noNav
        exact
      />

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
      <PrivateRoute
        component={UpdatePiece}
        path="/admin/pieces/:pieceId/edit"
        noNav
      />
      <PrivateRoute component={ViewPiece} path="/admin/pieces/:pieceId" noNav />
      <PrivateRoute component={MyPieces} path="/admin/pieces" exact />
      <PrivateRoute component={LoggedInScan} path="/admin/pickup" exact />
      <PrivateRoute
        component={UpdateProfile}
        path="/admin/profile/edit"
        noNav
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
      {/* <PrivateRoute component={Logout} path="/admin/logout" exact /> */}
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
