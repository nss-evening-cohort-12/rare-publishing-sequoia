import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';

import './Post.css';

class Post extends React.Component {
  render() {
    const { post } = this.props;
    const detailLink  = `/viewpost/${post.id}`
    const pub_date = moment(post.publication_date).format('MMM Do, YYYY');
    console.error(post)
    return(
      <div className="post-list">
        <h5>{post.user.display_name}</h5>
        <Link to={detailLink}><h5>{post.title}</h5></Link>
        <h5>{post.category_id}</h5>
      </div>

    )
  }
}


export default withRouter(Post);
