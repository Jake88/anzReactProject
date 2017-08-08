import React, { Component } from 'react';
import ApiManager from './utilities/api-manager/api-manager'
import SearchBar from './components/search-bar/search-bar'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1
    }

    Object.assign(this, {
      searchCallback: this.searchCallback.bind(this)
    });
  }

  searchCallback(searchString) {
    ApiManager.searchGitHubUsers({searchString}).then(response => {
      console.log(response);
      this.setState({searchResponse: response});
    });
  }

  render() {
    return (
      <div className="app">
        <SearchBar searchCallback={this.searchCallback}/>
      </div>
    );
  }
}

export default App;
