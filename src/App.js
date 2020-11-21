import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  useLocation,
} from 'react-router-dom'
import { Box } from '@material-ui/core'
import { LastLocationProvider } from 'react-router-last-location'

import { useAuth } from 'hooks/auth-hook'
import { AuthContext } from 'contexts/auth-context'
import firebase from './firebase'

import Background from 'layouts/Background'
import NewPieceImage from 'pages/NewPieceImage/NewPieceImage'
import NewPiece from 'pages/NewPiece/NewPiece'
import ViewPiece from 'pages/ViewMyPiece/ViewMyPiece'
import MyPieces from 'pages/MyPieces/MyPieces'
import UpdatePiece from 'pages/UpdatePiece/UpdatePiece'
import MyProfile from 'pages/UserProfile/UserProfile'
import UpdateProfile from 'pages/UpdateProfile/UpdateProfile'
import NewPickup from 'pages/Pickup/Pickup'
import UserSignup1 from 'pages/UserSignup1/UserSignup1'
import UserSignup2 from 'pages/UserSignup2/UserSignup2'
import SignupSuccess from 'pages/UserSignupSuccess/SignupSuccess'
import SignIn from 'pages/SignIn/SignIn'
import BetaSignup from 'pages/BetaSignup/BetaSignup'
import ViewUser from 'pages/ViewUser/ViewUser'
import UpdateEmail from 'pages/UserUpdateEmail/UserUpdateEmail'
import UpdatePassword from 'pages/UserUpdatePassword/UserUpdatePassword'
import UpdateUsername from 'pages/UserUpdateUsername/UserUpdateUsername'
import RecoverPassword from 'pages/RecoverPassword/RecoverPassword'
import ResetPassword from 'pages/ResetPassword/ResetPassword'
import ContactSupport from 'pages/UserContactSupport/ContactSupport'
import NewScan from 'pages/PickupStart/PickupStart'
import ScanLoadingScreen from 'components/ScanLoadingScreen'
import ScanLoadingScreenDemo from 'components/ScanLoadingScreenDemo'

import ErrorBar from 'components/ErrorBar'
import MessageBar from 'components/MessageBar'
import NavBar from 'components/NavBar'

firebase.analytics()

const App = () => {
  let routes
  const { token, login, logout, authStatus } = useAuth()

  const PrivateRoute = ({ component: Component, noNav, ...rest }) => {
    const location = useLocation()

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
            {authStatus === 'unauthenticated' && (
              <Redirect
                to={{
                  pathname: '/admin/login',
                  state: { referrer: location.pathname },
                }}
              />
            )}
          </>
        )}
      />
    )
  }

  const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const location = useLocation()

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
              <Redirect
                to={(location.state || {}).referrer || '/admin/pieces'}
              />
            )}
          </>
        )}
      />
    )
  }

  routes = (
    <Switch>
      <PublicRoute
        restricted={false}
        component={ScanLoadingScreenDemo}
        path="/loading"
        exact
      />

      <PublicRoute restricted={true} component={NewScan} path="/" exact />

      <PublicRoute restricted={true} component={SignIn} path="/login" exact />

      <PublicRoute
        restricted={true}
        component={UserSignup1}
        path="/signup"
        exact
      />

      <PublicRoute
        restricted={true}
        component={BetaSignup}
        path="/s/subscribe"
        exact
      />

      <PublicRoute
        restricted={true}
        component={SignIn}
        path="/admin/login"
        exact
      />

      <PublicRoute
        restricted={false}
        component={RecoverPassword}
        path="/admin/recover"
        exact
      />

      <PublicRoute
        restricted={false}
        component={ResetPassword}
        path="/admin/reset/:userId/:token"
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
      <PrivateRoute component={NewScan} path="/admin/pickup" exact />
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
            <Background />
            {/* <ScanLoadingScreen /> */}
            <ScanLoadingScreenDemo />
            {routes}
          </>
        </LastLocationProvider>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
