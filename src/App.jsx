import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Cat from './Cat';
import CatDetail from './CatDetail';

function App() {
  const isLoggedIn = localStorage.getItem('token');

  return (
    <Router>
      <Switch>
        <Route exact path="/cats" component={Cat} />
        <Route path="/login" component={Login} />
        <Route path="/cats/:id" component={CatDetail} />
        {isLoggedIn ? (
          <Route path="/cats" component={Cat} />
        ) : (
          <Redirect to="/login" />
        )}
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
}

export default App;




