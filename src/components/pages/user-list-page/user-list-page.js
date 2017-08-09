import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import AvatarPanel from '../../avatar-panel/avatar-panel'
import Pagination from '../../pagination/pagination'
import '../../../shared.css'
import './user-list-page.css'

class UserListPage extends Component {
  createList() {

    if (!this.props.searchResponse) {
      return <Redirect to='/'/>
    } else {
      return (
        <div className="user-list-page">
          <Pagination {...this.props}/>

          <div className="user-list">
            { 
              this.props.searchResponse.items.map(
                ({login, avatar_url}, index) => <AvatarPanel login={login} key={index} avatar_url={avatar_url}/>
              ) 
            }
          </div>
        </div>   
      )
    }
  }

  render() {
    return this.createList.bind(this)()
  }
}

export default UserListPage;