import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import '../../shared.css'
import './search-bar.css'

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {username: ''};

    Object.assign(this, {
      onSubmit: this.onSubmit.bind(this),
      searchInputChange: this.searchInputChange.bind(this),
      searchInput: this.searchInput.bind(this),
      searchButton: this.searchButton.bind(this)
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.history.push(`/users?search=${this.state.username}&page=1`);    
    this.setState({username: ''});
  }

  searchInputChange(event) {
    this.setState({username: event.target.value});
  }

  /*
    Developer note:
      To save time I have not created individual form element components.
      However I am aware that I can, and I can further extend those to create bespoke versions.
  */
  searchInput() {
    return (
      <div className="searchInput">
        <label htmlFor="searchInput">
          GitHub Username:
        </label>
        <input 
          id="searchInput" 
          name="searchInput" 
          type="text"
          placeholder="Search a GitHub Username"
          className="input--common" 
          value={this.state.username} 
          onChange={this.searchInputChange}
        />
      </div>
    );
  }

  searchButton() {
    return (
      <button 
        id="searchButton"
        disabled={!this.state.username}
        type="submit" 
        className="button--common">
        Search
      </button>
    );
  }

  render() {
    return (
      <div className="searchBar">
        <h1>Jake Turner's Code Challenge</h1>
        <form id="searchForm" name="searchForm" onSubmit={this.onSubmit}>
          {this.searchInput()}
          {this.searchButton()}
        </form>
      </div>
    );
  }
}

export default withRouter(SearchBar);