import React from 'react';
import { withRouter } from 'react-router-dom';
import './NewPost.css';

class NewPost extends React.Component {
  state = {
    category_id: '',
    title: '',
    content: '',
    header_img: '',
    categories: [],
  }

  componentDidMount() {
    this.getAllCategories();
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

  createPost = (e) => {
    e.preventDefault();
    const { category_id, content, title, header_img } = this.state

    const timeElapsed = Date.now()
    const user_id = localStorage.getItem("rare_user_id")
    const publication_date = new Date(timeElapsed)

    const new_post = {
      user_id: user_id,
      category_id: category_id,
      title: title,
      content: content,
      publication_date: publication_date,
      header_img: header_img
    }

    fetch("http://127.0.0.1:8088/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(
        new_post
      )
    })
      .then(res => res.json())
      .then(res => {
        this.props.history.push('/posts')
      })
  }

  getAllCategories = () => {
    return fetch("http://localhost:8088/categories")
    .then(res => res.json())
    .then(res => {
      this.setState({ categories: res })
      this.setState({ category_id: res[0].id })
    })
}

  render() {
    const categories = this.state.categories.map((obj) => { return <option value={obj.id} key={obj.id}>{obj.name}</option> })

    return (
      <div className="form-wrapper">
        <h1 className="text-center mt-3">Create New Post</h1>
        <form>
          <div className="form-group">
          <label htmlFor="category_id">Category</label>
            <select ref="catInput" class="form-control form-control-lg" id="category_id" onChange={this.changeCategoryEvent}>
              {categories}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="title">Post Title</label>
            <input type="text" className="form-control" id="title" placeholder="Post Title" onChange={this.changeTitleEvent} />
          </div>
          <div className="form-group">
            <label htmlFor="content">Post Content</label>
            <textarea className="form-control" id="content" rows="3" placeholder="Post" onChange={this.changeContentEvent} />
          </div>
          <div className="form-group">
            <label htmlFor="header_img">Header Image</label>
            <input type="text" className="form-control" id="header_img" placeholder="IMG URL" onChange={this.changeHeaderImgEvent} />
          </div>
          <button className="btn btn-light" onClick={this.createPost}>Create</button>
        </form>
      </div>
    )
  }
}

export default withRouter(NewPost);
