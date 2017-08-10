import React, { Component } from 'react';
import ApiManager from '../../../utilities/api-manager/api-manager'

import '../../../shared.css'
import './user-details-page.css'

class UserDetailsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }

    const username = this.props.match.params.username;
    ApiManager.getGitHubUser({username}).then(({data}) => {
      this.setState({
        user: data,
        loading: false,
        error: null
      });
    }, ({message}) => {
      this.setState({
        loading: false,
        error: message
      });
    });
  }
  
  render() {
    if (!this.state.loading && !this.state.error) {
      const user = this.state.user;
      return (
        <div className="user-details-page">
          <div>
            <button onClick={() => {this.props.history.goBack()}}
              className="button--common">
              Back to your search
            </button>
          </div>

          <h1>{user.login}</h1>
          <h4>{user.name}</h4>

          <div className="flex-row user-pane">
            <img 
              className="avatar" 
              src={user.avatar_url}
              alt={`${user.login}'s avatar`}
            />
            <div className="flex-column">
              <dl>
                <dt>Email</dt><dd className={!user.email && 'light'}>{user.email || '-'}</dd>
                <dt>Location</dt><dd className={!user.location && 'light'}>{user.location || '-'}</dd>
                <dt>Following</dt><dd className={!user.following && 'light'}>{user.following || '-'}</dd>
                <dt>Followers</dt><dd className={!user.followers && 'light'}>{user.followers || '-'}</dd>
                <dt>Public Repos</dt><dd className={!user.public_repos && 'light'}>{user.public_repos || '-'}</dd>
              </dl>
            </div>
          </div>
        </div>
      )
    } else {
      return <div className="loading-label">{this.state.error || 'Loading...'}</div>
    }
    
  }
}

export default UserDetailsPage;