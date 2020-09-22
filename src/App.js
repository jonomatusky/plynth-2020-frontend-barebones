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
import PieceImageCrop from './imageEditing/pages/PieceImageCrop'
import NewPiece from './pieces/pages/NewPiece'
import ViewPiece from './pieces/pages/ViewPiece'
import MyPieces from './pieces/pages/MyPieces'
import UpdatePiece from './pieces/pages/UpdatePiece'
// import Scans from './scans/pages/Scans'
import MyProfile from './users/pages/MyProfile'
import UpdateProfile from './users/pages/UpdateProfile'
import UserSignup1 from './signup/pages/UserSignup1'
import UserSignup2 from './signup/pages/UserSignup2'
import SignupSuccess from './signup/pages/SignupSuccess'
// import SignUp from './users/pages/SignUp'
import Login from './users/pages/Login'
import LoggedOut from './scans/pages/LoggedOut'
import BetaSignup from './users/pages/BetaSignup'
import UserProfile from './users/pages/UserProfile'
import UpdateEmail from './users/pages/UpdateEmail'
import ChangePassword from './users/pages/ChangePassword'
import ChangeUsername from './users/pages/ChangeUsername'
import ContactSupport from './users/pages/ContactSupport'
import Logout from './users/pages/Logout'

import NavBar from './shared/components/navigation/NavBar'

const App = () => {
  const { token, isLoading, login, logout, user, updateUser } = useAuth()

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

  const PrivateNoNavRoute = ({ component: Component, ...rest }) => {
    return !isLoading ? (
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
      <PublicRoute restricted={true} component={Login} path="/s/login" exact />
      <PublicRoute
        restricted={true}
        component={BetaSignup}
        path="/s/subscribe"
        exact
      />
      <PublicRoute restricted={true} component={LoggedOut} path="/" exact />

      <PublicRoute
        restricted={true}
        component={UserSignup1}
        path="/signup"
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

      <PrivateNoNavRoute component={NewImage} path="/admin/create" exact />
      <PrivateNoNavRoute
        component={PieceImageCrop}
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
      <PrivateRoute component={ViewPiece} path="/admin/pieces/:pieceId" />
      <PrivateRoute component={MyPieces} path="/admin/pieces" exact />
      <PrivateRoute component={LoggedOut} path="/admin/pickup" exact />
      {/* <PrivateRoute component={Scans} path="/admin/pickups" exact /> */}
      {/* <PrivateRoute component={MyCollection} path="/admin/collection" exact /> */}
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
        user: user,
        login: login,
        logout: logout,
        updateUser: updateUser,
      }}
    >
      <Router>{routes}</Router>
    </AuthContext.Provider>
  )
}

export default App
