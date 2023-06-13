import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Header from './Header/header';
import Header_public from './Header/header_user';
import Header_worker from './Header/header_worker';
import Cat from './Cat';
import CatDetail from './CatDetail';

function HeaderWrapper({ isLoggedIn, role }) {
  if (isLoggedIn) {
    return role === 'charityWorker' ? <Header_worker /> : <Header_public />;
  }
  return <Header />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    setIsLoggedIn(!!token);
    setRole(userRole || '');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setRole('');
  };

  return (
    <Router>
      <HeaderWrapper isLoggedIn={isLoggedIn} role={role} />
      <Switch>
        <Route exact path="/" component={Cat} />
        <Route exact path="/cats" component={Cat} />
        <Route path="/login">
          {isLoggedIn ? <Redirect to="/cats" /> : <Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />}
        </Route>
        <Route path="/cats/:id" component={CatDetail} />
      </Switch>
    </Router>
  );
}

export default App;




