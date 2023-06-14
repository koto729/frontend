import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Header from './Header/header';
import Header_public from './Header/header_user';
import Header_worker from './Header/header_worker';
import Cat from './Cat';
import CatDetail from './CatDetail';
import AddCat from './AddCat';
import Public from './Cat_Public';
import Worker from './Cat_Worker';



function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Cat} />
        <Route exact path="/cats" component={Cat} />
        <Route path="/login" component={Login} />
        <Route path="/public" component={Public} />
        <Route path="/worker" component={Worker} />
        <Route path="/cats/:id" component={CatDetail} />
        <Route path="/addcat" component={AddCat} />
      </Switch>
    </Router>
  );
}

export default App;




