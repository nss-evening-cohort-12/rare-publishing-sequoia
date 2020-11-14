import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';

import "./Comment.css"

class Comment extends React.Component {
  state = { 
    pub_date: '',
  }
  
  componentDidMount() {
    this.getDate();
  }

  getDate = () => {
    const { comment } = this.props;
    const publication_date = new Date(comment.publication_date)
    const pub_date = moment(publication_date).format('MMM Do, YYYY');
    this.setState({ pub_date: pub_date })
  }

  submit = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Are you sure?</h1>
            <p>You want to delete this comment?</p>
            <button className="mr-3 dialog-btn" onClick={onClose}><h5 className="dialog-txt">No</h5></button>
            <button className="dialog-btn"
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

  handleClickDelete = () => {
    const { comment, getPostComments } = this.props;
    const { postId } = this.props.match.params;
    return fetch(`http://localhost:8088/comments/${comment.id}`, {
      method: "DELETE"
    }).then(() => {
      getPostComments();
    })
  }

  showOptions = () => {
    const { comment } = this.props 
    const user_id = localStorage.getItem("rare_user_id")
    const editLink = `/editcomment/${comment.id}`
    if(comment.user_id == user_id) {
      return  <div className="comment-functions"><Link to={editLink}><i className="fas fa-edit mr-1"></i></Link><i class="fas fa-trash-alt" onClick={this.submit}></i></div>
    } else {
      return ''
    }
  }

  render() {
    const { comment } = this.props;
    const { pub_date } = this.state;

    return (
      <div className ="comment">
        <div className = "comment-header">
        {
            comment.user ? (
              <div className="post-author">
                <i className="fas fa-user mr-2"></i>
                <h6 className="author-name mr-4">{comment.user.display_name}</h6>
              </div>
            ) : (
                ''
              )
          }
          <h6>{pub_date}</h6>
        </div>
        <div className ="comment-body">
          <h5>{comment.subject}</h5>
          <p>{comment.content}</p>
        </div>
          {this.showOptions()}
      </div>
    )
  }
}

export default withRouter(Comment);
