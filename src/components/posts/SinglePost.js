import React from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment';

import "./SinglePost.css";

class SinglePost extends React.Component {
  state = {
    post: {},
  }

  componentDidMount() {
    this.getPostById()
  }

  getPostById = () => {
    const { postId } = this.props.match.params;
    return fetch(`http://localhost:8088/posts/${postId}`)
    .then(res => res.json())
    .then(res => {
      this.setState({ post: res })
    })
}

  render() {
    const { postId } = this.props.match.params;
    const { post } = this.state;
    const pub_date = moment(post.publication_date).format('MMM Do, YYYY');
    return (
      <div className="full-post">
        <h1>{post.title}</h1>
        {
          post.header_img ? (
            <img src={post.header_img} />
          ) : (
            <p><i>No Header Image</i></p>
          )
        }
        {/* <h4>{post.user.display_name}</h4> */}
        <h5>{post.content}</h5>
        <h4 className="mt-4">{pub_date}</h4>
      </div>
    )
  }
}

export default withRouter(SinglePost);
