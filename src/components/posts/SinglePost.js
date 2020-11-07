import React from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';

import Tag from '../tags/Tag';

import "./SinglePost.css";
import 'react-confirm-alert/src/react-confirm-alert.css';

class SinglePost extends React.Component {
  state = {
    post: {},
    post_tags: {},
  }

  componentDidMount() {
    this.getPostById()
    this.getPostTags()
  }

  getPostTags = () => {
    const { postId } = this.props.match.params;
    fetch(`http://localhost:8088/post_tags/${postId}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ post_tags: res })
      })
  }

  getPostById = () => {
    const { postId } = this.props.match.params;
    return fetch(`http://localhost:8088/posts/${postId}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ post: res })
      })
  }

  handleClickDelete = () => {
    const { postId } = this.props.match.params;
    return fetch(`http://localhost:8088/posts/${postId}`, {
      method: "DELETE"
    }).then(() => {
      this.props.history.push('/posts');
    })
  }

  submit = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Are you sure?</h1>
            <p>You want to delete this post?</p>
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

  render() {
    const { postId } = this.props.match.params;
    const { post, post_tags } = this.state;
    const strPost = JSON.stringify(post)
    const pub_date = moment(post.publication_date).format('MMM Do, YYYY');
    return (
      <div className="full-post">
        <div className="post-heading">
          <h1>{post.title}</h1>
          <div className="post-controls">
            <i className="fas fa-trash-alt mr-3" onClick={this.submit}></i>
            <i className="fas fa-edit"></i>
          </div>
        </div>
        {
          post.header_img ? (
            <img src={post.header_img} />
          ) : (
              <p><i>No Header Image</i></p>
            )
        }
        {
          post.user ? (
            <div className="post-author">
              <i className="fas fa-user mr-2"></i>
              <h4 className="author-name">{post.user.display_name}</h4>
              <h6 className="author-name lg ml-5">{pub_date}</h6>
            </div>
          ) : (
              ''
            )
        }
        <div className="d-flex flex-row">
          <small className="mr-3"><strong><em>Tags: </em></strong></small>
          {
            post_tags.length > -1 ? (
              post_tags.map((pt) => (<Tag key={pt.id} pt={pt} />))
            ) : (
                ''
              )
          }
        </div>
        <i class="fas fa-tags p-2 mb-3 mt-2 rounded-lg manage-tags-button">Manage Tags</i>
        <h6 className="mt-4">{post.content}</h6>
      </div>
    )
  }
}

export default withRouter(SinglePost);
