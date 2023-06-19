import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './Login';
import CatPage from './Cat';
import CatDetailPage from './CatDetail';
import AddCatPage from './AddCat';
import PublicPage from './Cat_Public';
import WorkerPage from './Cat_Worker';
import EditCatPage from './EditCat';
import AddFavoriteCatPage from './AddFavoriteCat';
import FavoriteListPage from './FavoriteList';
import RegisterPage from './Register';
import Message_publicPage from './Message_public';
import Message_workerPage from './Message_worker';



function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={CatPage} />
        <Route exact path="/cats" component={CatPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/public" component={PublicPage} />
        <Route path="/worker" component={WorkerPage} />
        <Route path="/cats/:id" component={CatDetailPage} />
        <Route path="/addcat" component={AddCatPage} />
        <Route path="/edit/:id" component={EditCatPage} />
        <Route path="/cat_user/:id" component={AddFavoriteCatPage} />
        <Route path="/favoritelist" component={FavoriteListPage} />
        <Route path="/message" component={Message_publicPage} />
        <Route path="/message_worker" component={Message_workerPage} />
      </Switch>
    </Router>
  );
}

export default App;




