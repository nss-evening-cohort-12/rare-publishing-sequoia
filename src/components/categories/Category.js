import React from 'react';
import { withRouter, Link } from 'react-router-dom'
import Categories from './Categories';
import { confirmAlert } from 'react-confirm-alert';
import './Categories.css'

  class Category extends React.Component {

    handleClickDelete = () => {
      const { id } = this.props.match.params;
      return fetch(`http://localhost:8088/categories/${id}`, {
        method: "DELETE"
      }).then(() => {
        this.props.history.push('/categories');
      })
    }
  
    submit = () => {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='custom-ui'>
              <h1>Are you sure?</h1>
              <p>You want to delete this post?</p>
              <button className ="mr-3 dialog-btn" onClick={onClose}><h5 className="dialog-txt">No</h5></button>
              <button className ="dialog-btn"
                onClick={() => {
                  this.handleClickDelete();
                  onClose();
                }}
              >
                <h5 className="dialog-txt">Yes, Delete</h5>
              </button>
            </div>
          );
        }
      });
    };


  render() {
    const { categories } = this.props;
    const editLink = `/editcategory/${categories.id}`
    return (
      <div className="categories-list">
        <h5>{categories.name}</h5>
        <Link to={editLink}><i className="fas fa-edit"></i></Link>
        <i class="fas fa-trash-alt mr-3"  onClick={this.submit}></i>
      </div>
    )
  }
}

export default Category;
