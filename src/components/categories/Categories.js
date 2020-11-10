import React from 'react';
import {  withRouter } from 'react-router-dom';
import './Categories.css'

class Categories extends React.Component {
  render() {
    const { categories } = this.props;
    return (
      <div className="categories-list">
        <h5>{categories.name}</h5>
      </div>
    )
  }
}

export default withRouter(Categories);
