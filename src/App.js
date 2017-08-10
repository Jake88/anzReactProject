import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import SearchBar from './components/search-bar/search-bar'
import { UserListPage, UserDetailsPage } from './components/pages/pages'
import './shared.css'

class App extends Component {
  constructor(props) {
    super(props);

    Object.assign(this, {
      usersRoute: this.usersRoute.bind(this)
    });
  }

  usersRoute() {
    return (
      <Switch>
        <Route path="/users" exact component={UserListPage} />
        <Route path="/users/:username" component={UserDetailsPage} />
      </Switch>
    )
  }

  render() {
    return (
      <div className="app">
        <SearchBar/>

        <main>
          <Switch>
            <Route path="/users" component={this.usersRoute} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
