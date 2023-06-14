import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Header from './Header/header';
import Header_public from './Header/header_user';
import Header_worker from './Header/header_worker';
import Cat from './Cat';
import CatDetail from './CatDetail';
import AddCat from './AddCat';

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
    setIsLoggedIn(!!token);
  }, []);



  return (
    <Router>
      <HeaderWrapper isLoggedIn={isLoggedIn} role={role} />
      <Switch>
        <Route exact path="/" component={AddCat} />
        <Route exact path="/cats" component={Cat} />
        <Route path="/login">
          {isLoggedIn ? <Redirect to="/cats" /> : <Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />}
        </Route>
        <Route path="/cats/:id" component={CatDetail} />
        <Route path="/addcat" component={AddCat} />
      </Switch>
    </Router>
  );
}

export default App;




