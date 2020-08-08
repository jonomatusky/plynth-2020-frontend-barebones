import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'

import NewImage from './pieces/pages/NewImage'
import NewPiece from './pieces/pages/NewPiece'
import ViewPiece from './pieces/pages/ViewPiece'
import ViewPieces from './pieces/pages/ViewPieces'
import UpdatePiece from './pieces/pages/UpdatePiece'
import NewScan from './scans/pages/NewScan'
import Scans from './scans/pages/Scans'
import MyCollection from './pieces/pages/MyCollection'
import CardTest from './pieces/pages/CardTest'
import Demo from './test/Demo'
import LoggedOut from './scans/pages/LoggedOut'
import BetaSignup from './users/pages/BetaSignup'

import NavBar from './shared/components/Navigation/NavBar'

const App = () => {
  // allows routes to be changed later based on authentication/authorization
  let navRoutes
  let noNavRoutes

  const WithNavBar = () => {
    return (
      <React.Fragment>
        <Route path="/">
          <NavBar />
        </Route>
        <main>
          <Switch>
            <Route path="/create" exact>
              <NewImage />
            </Route>
            <Route path="/create/piece" exact>
              <NewPiece />
            </Route>
            <Route path="/pieces/:pieceId/edit">
              <UpdatePiece />
            </Route>
            <Route path="/pieces/:pieceId">
              <ViewPiece />
            </Route>
            <Route path="/pieces">
              <ViewPieces />
            </Route>
            <Route path="/pickup" exact>
              <NewScan />
            </Route>
            <Route path="/pickups" exact>
              <Scans />
            </Route>
            <Route path="/collection" exact>
              <MyCollection />
            </Route>
            <Route path="/test" exact>
              <CardTest />
            </Route>
            <Route path="/demo" exact>
              <Demo />
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </React.Fragment>
    )
  }

  return (
    <Router>
      <Switch>
        <Route path="/signup" exact>
          <BetaSignup />
        </Route>
        <Route path="/" exact>
          <LoggedOut />
        </Route>
        <Route path="/">
          <WithNavBar />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default App
