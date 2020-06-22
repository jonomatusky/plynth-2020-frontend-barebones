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
import NewScan from './scans/pages/NewScan'
import Scans from './scans/pages/Scans'

import NavBar from './shared/components/Navigation/NavBar'

const App = () => {
  // allows routes to be changed later based on authentication/authorization
  let routes

  routes = (
    <Switch>
      <Route path="/create" exact>
        <NewImage />
      </Route>
      <Route path="/create/piece" exact>
        <NewPiece />
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
      <Redirect to="/pickups" />
    </Switch>
  )

  return (
    <Router>
      <NavBar />
      <main>{routes}</main>
    </Router>
  )
}

export default App
