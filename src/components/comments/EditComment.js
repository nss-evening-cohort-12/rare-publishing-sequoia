import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class EditComment extends React.Component {
  state = {
    subject: '',
    content: '',
    post_id: '',
  }

  componentDidMount() {
    this.getCommentById();
  }

  getCommentById = () => {
    const { commentId } = this.props.match.params;
    return fetch(`http://localhost:8088/comments/${commentId}`)
    .then(res => res.json())
    .then(res => {
      this.setState({ subject: res.subject, content: res.content, post_id: res.post_id })
    })
  }

  changeSubjectEvent = (e) => {
    e.preventDefault();
    this.setState({ subject: e.target.value });
  }

  changeContentEvent = (e) => {
    e.preventDefault();
    this.setState({ content: e.target.value });
  }

  editComment = (e) => {
    e.preventDefault();
    const { subject, content, post_id } = this.state
    const timeElapsed = Date.now()
    const user_id = localStorage.getItem("rare_user_id")
    const { commentId } = this.props.match.params;
    const edited_comment = {
        subject: subject,
        content: content,
        post_id: post_id,
        user_id: user_id,
        publication_date: timeElapsed
    }

    return fetch(`http://127.0.0.1:8088/comments/${commentId}`, {
          method: "PUT",
          body: JSON.stringify(
              edited_comment
          )
      })
          .then(res => {
            this.props.history.push(`/comments/${post_id}`)
          })
          .catch(err => console.error(err))
  }

  render() {
    const { subject, content, post_id } = this.state;
    const goBack = `/comments/${post_id}`
    return (
      <div className="form-wrapper">
      <h1 className="text-center mt-3">Edit Comment</h1>
      <form>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input type="text" className="form-control" id="subject" value={subject} onChange={this.changeSubjectEvent} />
        </div>
        <div className="form-group">
          <label htmlFor="content">Comment</label>
          <textarea className="form-control" id="content" rows="3" value={content} onChange={this.changeContentEvent}/>
        </div>
        <div className="edit-options">
          <button className="btn btn-light" onClick={this.editComment}>Submit</button>
          <Link to={goBack}><button className="btn btn-light cancel-btn">Cancel</button></Link>
        </div>
    </form>
  </div>
    )
  }
}

export default withRouter(EditComment);
