import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import ApiManager from './utilities/api-manager/api-manager'
import SearchBar from './components/search-bar/search-bar'
import { UserListPage, UserDetailsPage } from './components/pages/pages'
import './shared.css'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1
    }

    Object.assign(this, {
      searchCallback: this.searchCallback.bind(this),
      usersRoute: this.usersRoute.bind(this),
      toggleLoading: this.toggleLoading.bind(this)
    });
  }

  toggleLoading(forceFlag) {
    this.setState({loading: forceFlag || !this.state.loading});
  }

  searchCallback({ searchString, routerHistory , page }) {
    searchString = searchString || this.state.searchString;
    page = page || this.state.page;
    routerHistory.push('/');
    this.toggleLoading(true);
    ApiManager.searchGitHubUsers({searchString, page}).then(response => {
      this.toggleLoading(false);
      this.setState({searchResponse: response.data, page, searchString});
      routerHistory.replace('/users');
    });
  }

  usersRoute() {
    return (
      <Switch>
        <Route path="/users" exact render={(props) => {
          return <UserListPage 
            {...props} 
            searchResponse={this.state.searchResponse}
            page={this.state.page}
            searchCallback={this.searchCallback}/>
        }} />
        <Route path="/users/details" component={UserDetailsPage} />
      </Switch>
    )
  }

  render() {
    return (
      <div className="app">
        <SearchBar searchCallback={this.searchCallback}/>

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
