import React from 'react'
import {
  BrowserRouter as Router,
  Route as DomRoute,
  Redirect,
  Switch,
  useLocation,
} from 'react-router-dom'
import { Box } from '@material-ui/core'
import { LastLocationProvider } from 'react-router-last-location'

import { useAuth } from 'hooks/auth-hook'
import { AuthContext } from 'contexts/auth-context'
import { useFetch } from 'hooks/use-fetch'
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
import NewScan from 'pages/PickupTest/PickupTest'
import ScanLoadingScreen from 'components/ScanLoadingScreen'
import Home from 'pages/Home/Home'
import SignupCreator from 'pages/SignupCreator/SignupCreator'
import SignupFan from 'pages/SignupFan/SignupFan'
import ContactUs from 'pages/ContactUs/ContactUs'

import ErrorBar from 'components/ErrorBar'
import MessageBar from 'components/MessageBar'
import NavBar from 'components/NavBar'

firebase.analytics()

const App = () => {
  let routes
  const { token, login, logout, authStatus } = useAuth()

  const Route = ({
    component: Component,
    noNav,
    publicRoute,
    restricted,
    ...rest
  }) => {
    const location = useLocation()
    useFetch()

    return (
      <DomRoute
        {...rest}
        render={props => (
          <>
            {!publicRoute && authStatus === 'unauthenticated' && (
              <Redirect
                to={{
                  pathname: '/admin/login',
                  state: { referrer: '/' },
                }}
              />
            )}
            {publicRoute && restricted && authStatus === 'authenticated' && (
              <Redirect
                to={(location.state || {}).referrer || '/admin/pieces'}
              />
            )}
            {
              <>
                {authStatus === 'authenticated' && !publicRoute && !noNav && (
                  <NavBar />
                )}
                <main>
                  <Component {...props} />
                  {authStatus === 'authenticated' && !publicRoute && !noNav && (
                    <Box height="5rem" />
                  )}
                </main>
              </>
            }
          </>
        )}
      />
    )
  }

  routes = (
    <Switch>
      <Route publicRoute={true} component={Home} path="/" exact />

      <Route
        publicRoute={true}
        restricted={true}
        component={SignIn}
        path="/login"
        exact
      />

      <Route
        publicRoute={true}
        component={SignupCreator}
        path="/s/signup/creators"
        exact
      />

      <Route
        publicRoute={true}
        component={SignupFan}
        path="/s/signup/postcard-mixtape"
        exact
      />

      <Route publicRoute={true} component={ContactUs} path="/s/contact" exact />

      <Route
        publicRoute={true}
        restricted={true}
        component={UserSignup1}
        path="/signup"
        exact
      />

      <Route
        publicRoute={true}
        restricted={true}
        component={BetaSignup}
        path="/s/subscribe"
        exact
      />

      <Route
        publicRoute={true}
        restricted={true}
        component={SignIn}
        path="/admin/login"
        exact
      />

      <Route
        publicRoute={true}
        component={RecoverPassword}
        path="/admin/recover"
        exact
      />

      <Route
        publicRoute={true}
        component={ResetPassword}
        path="/admin/reset/:userId/:token"
        exact
      />

      <Route publicRoute={true} component={NewPickup} path="/pickup" exact />

      <Route
        publicRoute={true}
        path="/get-on-plynth"
        component={() => {
          window.location.href = 'https://site.plynth.com/get-on-plynth'
          return null
        }}
      />

      <Route
        component={UserSignup2}
        path="/admin/get-started/profile"
        noNav
        exact
      />
      <Route
        component={SignupSuccess}
        path="/admin/get-started/success"
        noNav
        exact
      />

      <Route component={UpdateProfile} path="/admin/profile/edit" noNav exact />

      <Route component={NewPieceImage} path="/admin/create/style" noNav exact />
      <Route component={NewPiece} path="/admin/create/piece" noNav exact />
      <Route component={UpdatePiece} path="/admin/pieces/:pieceId/edit" noNav />
      <Route component={ViewPiece} path="/admin/pieces/:pieceId" noNav />
      <Route component={MyPieces} path="/admin/pieces" exact />
      <Route component={NewScan} path="/admin/pickup" exact />
      <Route component={UpdateProfile} path="/admin/profile/edit" noNav exact />
      <Route component={MyProfile} path="/admin/profile" exact />
      <Route component={UpdateEmail} path="/admin/profile/email/change" exact />
      <Route
        component={UpdatePassword}
        path="/admin/profile/password/change"
        exact
      />
      <Route
        component={UpdateUsername}
        path="/admin/profile/username/change"
        exact
      />
      <Route component={ContactSupport} path="/admin/profile/help" exact />
      {/* <PrivateRoute component={Logout} path="/admin/logout" exact /> */}
      <Redirect from="/admin" to="/admin/profile" />
      <Redirect from="/postcardmixtape" to="/s/signup/postcard-mixtape" />

      <Route
        publicRoute={true}
        restricted={false}
        component={ViewUser}
        path="/:username"
      />

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
            <ScanLoadingScreen />
            {routes}
          </>
        </LastLocationProvider>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
