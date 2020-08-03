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
import ScanModalTest from './test/ScanModalTest'
import CardTest from './pieces/pages/CardTest'
import Demo from './test/Demo'

import NavBar from './shared/components/Navigation/NavBar'

const App = () => {
  // allows routes to be changed later based on authentication/authorization
  let navRoutes

  navRoutes = (
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
      <Redirect to="/collection" />
    </Switch>
  )

  return (
    <Router>
      <NavBar />
      <main>{navRoutes}</main>
    </Router>
  )
}

export default App
