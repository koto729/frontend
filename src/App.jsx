import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Cat from './Cat';
import CatDetail from './CatDetail';
import AddCat from './AddCat';
import Public from './Cat_Public';
import Worker from './Cat_Worker';
import EditCat from './EditCat';
import AddFavoriteCat from './AddFavoriteCat';
import FavoriteList from './FavoriteList';



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
        <Route path="/edit/:id" component={EditCat} />
        <Route path="/cat_user/:id" component={AddFavoriteCat} />
        <Route path="/favoritelist" component={FavoriteList} />
      </Switch>
    </Router>
  );
}

export default App;




