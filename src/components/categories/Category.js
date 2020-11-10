import React from 'react';

import Categories from './Categories'

import './Categories.css'

class Category extends React.Component {
  state = {
    Categories: [],
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
    const { category } = this.state;
    const myCategory = category.map((categories) => <Categories key={categories.id} categories={categories} />)
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

export default Category;
