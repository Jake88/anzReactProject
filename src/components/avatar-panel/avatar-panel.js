import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './avatar-panel.css'

class AvatarPanel extends Component {
  render() {
    return (
      <Link to={`/users/${this.props.login}`} title={this.props.login}>
        <div
          className="avatar-panel"
          style={{backgroundImage: `url(${this.props.avatar_url}`}}
        >
          <p className="username">{this.props.login}</p>
        </div>
      </Link>
    )
  }
}

export default AvatarPanel;