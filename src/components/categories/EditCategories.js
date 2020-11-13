import React from 'react';
import { withRouter } from 'react-router-dom';

class EditCategory extends React.Component {
  state = {
    name: '',
    id: '',
  }

  componentDidMount() {
    this.getCategoryById()
  }

  getCategoryById = () => {
    const { categoryId } = this.props.match.params;
    return fetch(`http://localhost:8088/categories/${categoryId}`)
    .then(res => res.json())
    .then(res => {
      this.setState({ category_id: res,})
    })
  }
}
