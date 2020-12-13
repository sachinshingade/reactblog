import logo from './logo.svg';
import './App.scss';
import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Header from './Components/Header/Header';
import PostList from './Components/PostList/PostList';
import PostDetail from './Components/PostDetail/PostDetail';

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
          <Header/>
          <Switch>
              <Route exact path={'/'} render={() => {
                  return <Redirect to={'/post'}/>
              }}/>
              <Route exact path={'/post'} component={PostList}/>
              <Route exact path={'/post-detail/:id'} component={PostDetail}/>
              {/* <Route exact path={'/products'} component={UserDashboard}/>
              <Route exact path={'/dashboard'} component={AdminDashboard}/>
              <Route exact path={'/cart'} component={Cart}/>
              <Route exact path={'/users'} component={UserList}/> */}
          </Switch>
          {/* <Footer/> */}
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
