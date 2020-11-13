import React from 'react';
import { withRouter } from 'react-router-dom';

class NewComment extends React.Component {
  state = {
    subject: '',
    contentt: '',
  }

  changeSubjectEvent = (e) => {
    e.preventDefault();
    this.setState({ subject: e.target.value });
  }

  changeContentEvent = (e) => {
    e.preventDefault();
    this.setState({ content: e.target.value });
  }

  addComment = (e) => {
    e.preventDefault();
    const { subject, content } = this.state
    const user_id = localStorage.getItem("rare_user_id")
    const { postId } = this.props.match.params;
    const timeElapsed = Date.now()

    const new_comment = {
      subject: subject,
      content: content,
      post_id: postId,
      user_id: user_id,
      publication_date: timeElapsed
    }

    fetch("http://127.0.0.1:8088/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(
        new_comment
      )
    })
      .then(res => res.json())
      .then(res => {
        this.props.history.push('/posts')
      })
  }

  render() {
    return (
      <div className="form-wrapper">
      <h1 className="text-center mt-3">Add A Comment</h1>
      <form>
        <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" className="form-control" id="subject" placeholder="Subject" onChange={this.changeSubjectEvent} />
          </div>
        <div className="form-group">
          <label htmlFor="content">Comment</label>
          <textarea className="form-control" id="content" rows="3" placeholder="Add your Comment" onChange={this.changeContentEvent} />
        </div>
        <button className="btn btn-light" onClick={this.addComment}>Add Comment</button>
      </form>
    </div>
    )
  }
}

export default withRouter(NewComment);
