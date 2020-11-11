
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';

import './Post.css';

class Post extends React.Component {
  render() {
    const { post } = this.props;
    const detailLink = `/viewpost/${post.id}`
    const pub_date = moment(post.publication_date).format('MMM Do, YYYY');
    return (
      <div className="post-list">
        <h5>{post.user.display_name}</h5>
        <Link to={detailLink}><h5>{post.title}</h5></Link>
        {
          post.category ? (
            <h5>{post.category.name}</h5>
          ) : (
              ''
            )
        }
      </div>

    )
  }
}


export default withRouter(Post);
