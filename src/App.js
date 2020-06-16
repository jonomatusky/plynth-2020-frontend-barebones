import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'

import './App.css'

import NewImage from './pieces/pages/NewImage'
import NewPiece from './pieces/pages/NewPiece'
import ViewPiece from './pieces/pages/ViewPiece'
import NewScan from './pieces/pages/NewScan'
import MainNavigation from './shared/components/Navigation/MainNavigation'

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
      <Route path="/pickup">
        <NewScan />
      </Route>
      <Redirect to="/create" />
    </Switch>
  )

  return (
    <Router>
      <MainNavigation />
      <main>{routes}</main>
    </Router>
  )
}

export default App
