import './App.css';
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  Landing,
  Home,
  Details,
  Form,
  Error
} from './Views/index.js'

function App() {
  return (
    <React.Fragment>
      <Switch>

        {/*  Route 1 - Landing */}
        <Route exact path='/'>
          <Landing />
        </Route>
        {/*  Route 2 - Home */}
        <Route exact path='/flavorfusion'>
          <Home />
        </Route>
        {/*  Route 3 - Details */}
        <Route exact path='/details/:id'>
          <Details />
        </Route>
        {/*  Route 4 - Form */}
        <Route exact path='/create-recipe'>
          <Form />
        </Route>
        {/*  Route 5 - ErrorPage */}
        <Route path='/'>
          <Error />
        </Route>

      </Switch>

    </React.Fragment>
  );
}

export default App;
