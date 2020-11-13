import React from 'react';
import './Categories.css'

class Category extends React.Component {
  render() {
    const { categories } = this.props;
    return (
      <div className="categories-list">
        <h5>{categories.name}</h5>
      </div>
    )
  }
}

export default Category;
