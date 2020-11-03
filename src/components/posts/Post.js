import React from 'react';
import moment from 'moment';

import './Post.css';

class Post extends React.Component {
  render() {
    const { post } = this.props;
    const pub_date = moment(post.publication_date).format('MMM Do, YYYY');
    return(
      <div className="post-list">
        <h5>{post.user.display_name}</h5>
        <h5>{post.title}</h5>
        <h5>{post.category_id}</h5>
      </div>

    )
  }
}


export default Post;