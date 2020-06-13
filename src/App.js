import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'

import NewImage from './pieces/pages/NewImage'
import NewPiece from './pieces/pages/NewPiece'

const App = () => {
  // allows routes to be changed later based on authentication/authorization
  let routes

  routes = (
    <Switch>
      <Route path="/" exact>
        <NewImage />
      </Route>
      <Route path="/create/piece" exact>
        <NewPiece />
      </Route>
      <Redirect to="/" />
    </Switch>
  )

  return (
    <Router>
      <main>{routes}</main>
    </Router>
  )
}

export default App
