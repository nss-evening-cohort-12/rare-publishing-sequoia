import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import Comment from "./Comment";

import "./PostComments.css";

class PostComments extends React.Component {
  state = {
    comments: [],
    postTitle: '',
  }

  componentDidMount() {
    this.getPostComments();
    this.getPostById();
  }

  getPostComments = () => {
    const { postId } = this.props.match.params;
    return fetch(`http://localhost:8088/comments?post_id=${postId}`)
    .then(res => res.json())
    .then(res => {
      this.setState({ comments: res })
    })
  }

  getPostById = () => {
    const { postId } = this.props.match.params;
    return fetch(`http://localhost:8088/posts/${postId}`)
    .then(res => res.json())
    .then(res => {
      this.setState({ postTitle: res.title })
    })
  }

  render() {
    const { postTitle, comments } = this.state;
    const comment = comments.map((comment) => <Comment key={comment.id} comment={comment} />)
    const { postId } = this.props.match.params;
    const goBack = `/viewpost/${postId}`
    return (
      <div>
        <div className="comment-heading">
          <h1>{postTitle}</h1>
          <div className="back-link">
            <Link to={goBack} className="back-link"><i className="fas fa-hand-point-left orange mr-1"></i><h6>Back to Post</h6></Link>
          </div>
        </div>
          <div className="comment-container">
            {comment}
          </div>
      </div>
    )
  }
}


export default withRouter(PostComments)
