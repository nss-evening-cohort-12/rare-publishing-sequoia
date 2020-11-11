import React from 'react';
import {  withRouter } from 'react-router-dom';

import Category from './Category'

import './Categories.css'

class Categories extends React.Component {
  state = {
    categories: [],
  }

componentDidMount() {
  this.getAllCategories();
}

getAllCategories = () => {
  return fetch("http://localhost:8088/categories")
  .then(res => res.json())
  .then(res => {
    this.setState({ categories: res })
  })
}

  render() {
    const { categories } = this.state;
    const myCategory = categories.map((category) => <Category key={category.id} categories={category} />)
    return (
      <div>
      <h1 className="text-center mt-3">View All Categories</h1>
      <div className="categories-container">
        {myCategory}
      </div>
    </div>


  )
 }
}

export default withRouter(Categories);
