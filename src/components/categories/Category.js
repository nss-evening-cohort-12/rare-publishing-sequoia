import React from 'react';
import { withRouter, Link } from 'react-router-dom'
import Categories from './Categories';
import './Categories.css'

class Category extends React.Component {
  render() {
    const { categories } = this.props;
    const editLink = `/editcategory/${categories.id}`
    return (
      <div className="categories-list">
        <h5>{categories.name}</h5>
        <Link to={editLink}><i className="fas fa-edit"></i></Link>
      </div>
    )
  }
}

export default Category;
