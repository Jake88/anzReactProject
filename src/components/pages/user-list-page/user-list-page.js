import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import AvatarPanel from '../../avatar-panel/avatar-panel'
import Pagination from '../../pagination/pagination'
import ApiManager from '../../../utilities/api-manager/api-manager'

import '../../../shared.css'
import './user-list-page.css'

class UserListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }

    Object.assign(this, {
      createList: this.createList.bind(this),
      loadData: this.loadData.bind(this),
      changePage: this.changePage.bind(this)
    });
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    this.loadData(prevState);
  }

  loadData(prevState) {
    const params = new URLSearchParams(this.props.location.search);
    const searchString = params.get('search');
    const page = params.get('page') || 1;

    if (
      !prevState ||
      (prevState.searchString !== searchString) ||
      (prevState.page !== page)
    ) {
      this.setState({
        loading: true,
        page,
        searchString
      });

      ApiManager.searchGitHubUsers({searchString, page}).then(({data}) => {
        this.setState({
          searchResponse: data,
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
  }

  changePage(page) {
    this.props.history.push(`/users?search=${this.state.searchString}&page=${page}`)
  }

  getLabel() {
    let label;
    if (this.state.loading) {
      label = 'Loading...';
    } else if (this.state.error) {
      label = this.state.error;
    } else if (!this.state.searchResponse.items.length) {
      label = 'No users found. Please try again.';
    }
    return label;
  }

  createList() {
    const label = this.getLabel.bind(this)();
    if (label) {
      return <div className="loading-label">{label}</div>
    } else if (!this.state.searchResponse) {
      return <Redirect to='/'/>
    } else {
      return (
        <div className="user-list-page">
          <Pagination {...this.state} changePage={this.changePage}/>

          <div className="user-list">
            { 
              this.state.searchResponse.items.map(
                (itemProps, index) => <AvatarPanel key={index} {...itemProps}/>
              ) 
            }
          </div>
        </div>   
      )
    }
  }

  render() {
    return this.createList()
  }
}

export default UserListPage;