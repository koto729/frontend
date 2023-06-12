import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Cat from './Cat';

function App() {
  const isLoggedIn = localStorage.getItem('token');

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
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




