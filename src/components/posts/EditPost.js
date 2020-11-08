import { title } from 'process';
import React from 'react';
import { withRouter } from 'react-router-dom';

class EditPost extends React.Component {
  state = {
    category_id: '',
    title: '',
    content: '',
    header_img: '',
  }

  componentDidMount() {
    this.getPostById()
  }

  getPostById = () => {
    const { postId } = this.props.match.params;
    return fetch(`http://localhost:8088/posts/${postId}`)
    .then(res => res.json())
    .then(res => {
      this.setState({ category_id: res.category_id, title: res.title, content: res.content, header_img: res.header_img })
    })
  }

  changeCategoryEvent = (e) => {
    e.preventDefault();
    this.setState({ category_id: e.target.value });
  }

  changeTitleEvent = (e) => {
    e.preventDefault();
    this.setState({ title: e.target.value });
  }

  changeContentEvent = (e) => {
    e.preventDefault();
    this.setState({ content: e.target.value });
  }

  changeHeaderImgEvent = (e) => {
    e.preventDefault();
    this.setState({ header_img: e.target.value });
  }

  editPost = (e) => {
    e.preventDefault();
    const { category_id, content, title, header_img } = this.state

    const { postId } = this.props.match.params;
    const timeElapsed = Date.now()
    const user_id = localStorage.getItem("rare_user_id")
    const publication_date = new Date(timeElapsed)

    const edited_post = {
        user_id: user_id,
        category_id: category_id,
        title: title,
        content: content,
        publication_date: publication_date,
        header_img: header_img
    }

    fetch(`http://127.0.0.1:8088/posts/${postId}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          body: JSON.stringify(
              edited_post
          )
      })
          .then(res => {
                this.props.history.push(`/viewpost/${postId}`)
          })
  }

  render() {
    const { title, content, header_img, category_id } = this.state;
    return (
      <div className="form-wrapper">
      <h1 className="text-center mt-3">Edit Post</h1>
      <form>
        <div className="form-group">
          <label htmlFor="category_id">Category ID - Placeholder</label>
          <input type="text" className="form-control" id="category_id" value={category_id} onChange={this.changeCategoryEvent}/>
        </div>
        <div className="form-group">
          <label htmlFor="title">Post Title</label>
          <input type="text" className="form-control" id="title" value={title} onChange={this.changeTitleEvent} />
        </div>
        <div className="form-group">
          <label htmlFor="content">Post Content</label>
          <textarea className="form-control" id="content" rows="3" value={content} onChange={this.changeContentEvent}/>
        </div>
        <div className="form-group">
          <label htmlFor="header_img">Header Image</label>
          <input type="text" className="form-control" id="header_img" value={header_img} onChange={this.changeHeaderImgEvent} />
        </div>
      <button className="btn btn-light" onClick={this.editPost}>Submit</button>
    </form>
  </div>
    )
  }
}

export default withRouter(EditPost);
