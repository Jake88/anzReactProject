import React, { Component } from 'react';
import { Constants } from '../../utilities/constants';
import './pagination.css';

class Pagination extends Component {
  constructor(props) {
    super(props);

    Object.assign(this, {
      searchCallback: this.searchCallback.bind(this)
    });
  }

  searchCallback(newPageNumber) {
    this.props.searchCallback({
      page: newPageNumber,
      routerHistory: this.props.history
    });
  }

  render() {
    const page = this.props.page;
    const searchResponse = this.props.searchResponse;

    const disableNextBtnExpression = Math.ceil(searchResponse.total_count / Constants.MAX_PAGINATION) === page
    const disablePrevBtnExpression = page === 1

    const lowerThreshhold = Constants.MAX_PAGINATION * (page-1);
    const upperThreshold = lowerThreshhold + searchResponse.items.length

    return (
      <div className="top-bar">
        <button 
          onClick={() => this.searchCallback(page - 1)}
          className="prev"
          disabled={disablePrevBtnExpression}
        >Previous</button>
        <button 
          onClick={() => this.searchCallback(page + 1)}
          className="next"
          disabled={disableNextBtnExpression}
        >Next</button>
        Showing between <strong>{lowerThreshhold}</strong> and <strong>{upperThreshold}</strong> of <strong>{searchResponse.total_count}</strong>
      </div>
    )
  }
}

export default Pagination;