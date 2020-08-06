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

import NavBar from './shared/components/Navigation/NavBar'

const App = () => {
  // allows routes to be changed later based on authentication/authorization
  let navRoutes
  let noNavRoutes

  const WithNavBar = () => {
    return (
      <React.Fragment>
        <Route path="/login">
          <NavBar />
        </Route>
        <main>
          <Switch>
            <Route path="/login" exact>
              <MyCollection />
            </Route>
            <Route path="/login/create" exact>
              <NewImage />
            </Route>
            <Route path="/login/create/piece" exact>
              <NewPiece />
            </Route>
            <Route path="/login/pieces/:pieceId/edit">
              <UpdatePiece />
            </Route>
            <Route path="/login/pieces/:pieceId">
              <ViewPiece />
            </Route>
            <Route path="/login/pieces">
              <ViewPieces />
            </Route>
            <Route path="/login/pickup" exact>
              <NewScan />
            </Route>
            <Route path="/login/pickups" exact>
              <Scans />
            </Route>
            <Route path="/login/collection" exact>
              <MyCollection />
            </Route>
            <Route path="/login/test" exact>
              <CardTest />
            </Route>
            <Route path="/login/demo" exact>
              <Demo />
            </Route>
          </Switch>
        </main>
      </React.Fragment>
    )
  }

  const NoNavBar = () => {
    return (
      <main>
        <Switch>
          <Route path="/">
            <LoggedOut />
          </Route>
        </Switch>
      </main>
    )
  }

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <NoNavBar />
        </Route>
        <Route>
          <WithNavBar path="/login" exact />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default App
