import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route as DomRoute,
  Redirect,
  Switch,
  useLocation,
} from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location'

import { useAuth } from 'hooks/auth-hook'
import { AuthContext } from 'contexts/auth-context'
import { useFetch } from 'hooks/use-fetch'
import firebase from './firebase'
import posthog from 'posthog-js'

import Background from 'layouts/Background'
import Navigation from 'components/Navigation'
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
import Subscribe from 'pages/Subscribe/Subscribe'
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
import PreviewProfile from 'pages/PreviewProfile/PreviewProfile'
import ClaimProfile from 'pages/ClaimProfile/ClaimProfile'

import SALayout from 'layouts/SALayout'
import SAViewPieces from 'pages/SAViewPieces/SAViewPieces'
import SAViewPiece from 'pages/SAViewPiece/SAViewPiece'
import SAUpdatePiece from 'pages/SAUpdatePiece/SAUpdatePiece'
import SAViewUsers from 'pages/SAViewUsers/SAViewUsers'
import SAViewUser from 'pages/SAViewUser/SAViewUser'
import SAUpdateUser from 'pages/SAUpdateUser.js/SAUpdateUser'
import SARemoveUser from 'pages/SARemoveUser/SARemoveUser'
import SAViewScans from 'pages/SAViewScans/SAViewScans'
import SAViewScan from 'pages/SAViewScan/SAViewScan'
import SASignIn from 'pages/SASignIn/SASignIn'
import SAUpdateUsername from 'pages/SAUpdateUsername/SAUpdateUsername'
import SAUpdateEmail from 'pages/SAUpdateEmail/SAUpdateEmail'
import SACreateUser from 'pages/SACreateUser/SACreateUser'
import SAReassignPiece from 'pages/SAResassignPiece/SAReassignPiece'

import IconButtonTest from 'pages/IconButtonTest/IconButtonTest'

import ErrorBar from 'components/ErrorBar'
import MessageBar from 'components/MessageBar'

firebase.analytics()
const POSTHOG_KEY = process.env.REACT_APP_POSTHOG_KEY
posthog.init(POSTHOG_KEY, { api_host: 'https://app.posthog.com' })

const App = () => {
  let routes
  const { token, login, logout, authStatus } = useAuth()

  const Route = ({
    component: Component,
    noNav,
    publicRoute,
    superadmin,
    restricted,
    ...rest
  }) => {
    const location = useLocation()
    useFetch()

    useEffect(() => {
      posthog.capture('$pageview')
    }, [location])

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
                to={(location.state || {}).referrer || '/admin/profile'}
              />
            )}

            {(publicRoute || noNav) && (
              <main>
                <Component {...props} />
              </main>
            )}
            {authStatus === 'authenticated' &&
              !publicRoute &&
              !noNav &&
              !superadmin && (
                <Navigation>
                  <Component {...props} />
                </Navigation>
              )}
            {authStatus === 'authenticated' &&
              !publicRoute &&
              !noNav &&
              superadmin && (
                <SALayout>
                  <Component {...props} />
                </SALayout>
              )}
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
        component={IconButtonTest}
        path="/icon-button-test"
        exact
      />

      <Redirect from="/superadmin" to="/superadmin/users" exact />
      <Route
        publicRoute={true}
        restricted={true}
        component={SASignIn}
        path="/superadmin/login"
        exact
      />
      <Route
        superadmin={true}
        component={SAViewPieces}
        path="/superadmin/pieces"
        exact
      />
      <Route
        superadmin={true}
        component={SAViewPiece}
        path="/superadmin/pieces/:pieceId"
        exact
      />
      <Route
        superadmin={true}
        component={SAUpdatePiece}
        path="/superadmin/pieces/:pieceId/edit"
        exact
      />
      <Route
        superadmin={true}
        component={SAReassignPiece}
        path="/superadmin/pieces/:pieceId/reassign"
        exact
      />
      <Route
        superadmin={true}
        component={SAViewScans}
        path="/superadmin/pickups"
        exact
      />
      <Route
        superadmin={true}
        component={SAViewScan}
        path="/superadmin/pickups/:scanId"
        exact
      />
      <Route
        superadmin={true}
        component={SAViewUsers}
        path="/superadmin/users"
        exact
      />
      <Route
        superadmin={true}
        component={SAViewUser}
        path="/superadmin/users/:username"
        exact
      />
      <Route
        superadmin={true}
        component={SARemoveUser}
        path="/superadmin/users/:username/remove"
        exact
      />
      <Route
        superadmin={true}
        component={SAUpdateUser}
        path="/superadmin/users/:username/edit"
        exact
      />
      <Route
        superadmin={true}
        component={SAUpdateUsername}
        path="/superadmin/users/:username/change/username"
        exact
      />
      <Route
        superadmin={true}
        component={SAUpdateEmail}
        path="/superadmin/users/:username/change/email"
        exact
      />
      <Route
        superadmin={true}
        component={SACreateUser}
        path="/superadmin/new-user"
        exact
      />

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
        component={Subscribe}
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

      <Route
        noNav
        publicRoute={true}
        component={NewPickup}
        path="/pickup"
        exact
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
      <Redirect from="/get-on-plynth" to="/s/signup/creators" />

      <Route
        publicRoute={true}
        restricted={true}
        component={PreviewProfile}
        path="/:username/preview/:code"
        exact
      />

      <Route
        publicRoute={true}
        restricted={true}
        component={ClaimProfile}
        path="/:username/claim/:code"
        exact
      />

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
            <ScanLoadingScreen />
            {routes}
          </>
        </LastLocationProvider>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
