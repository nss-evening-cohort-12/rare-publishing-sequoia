import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

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
      </div>
    )
  }
}

export default withRouter(Comment);
