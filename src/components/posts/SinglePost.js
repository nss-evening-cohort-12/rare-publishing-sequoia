import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import { Multiselect } from 'multiselect-react-dropdown';

import Tag from '../tags/Tag';

import "./SinglePost.css";
import 'react-confirm-alert/src/react-confirm-alert.css';

class SinglePost extends React.Component {
  state = {
    is_hidden: true,
    is_active: false,
    options: [],
    post: {},
    post_tags: {},
    selected_tags: [],
  }

  componentDidMount() {
    this.updateAll();
  }

  toggleView = () => {
    this.setState({ is_hidden: !this.state.is_hidden })
    this.setState({ is_active: !this.state.is_active })
  }

  updateAll = () => {
    this.getPostById();
    this.getPostTags();
    this.getAllTags();
  }

  onRemove = (selectedList, removedItem) => {
    fetch(`http://localhost:8088/newposttag/${removedItem.post_tag_id}`, {
      method: "DELETE"
    })
      .then(() => this.updateAll());
  }

  onSelect = (selectedList, selectedItem) => {
    const new_post_tag = {
      post_id: selectedItem.current_post_id,
      tag_id: selectedItem.tag_id
    }

    fetch("http://localhost:8088/newposttag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(
        new_post_tag
      )
    })
      .then(() => this.updateAll());
  }

  getAllTags = () => {
    const { postId } = this.props.match.params;
    fetch("http://localhost:8088/tags")
      .then(res => res.json())
      .then(res => {
        let my_options = [];
        res.forEach((opt) => {
          let my_dict = {}
          my_dict['current_post_id'] = Number(postId);
          my_dict['tag_name'] = opt.name;
          my_dict['tag_id'] = opt.id;
          my_options.push(my_dict);
        })
        this.setState({ options: my_options })
      })
  }

  getPostTags = () => {
    const { postId } = this.props.match.params;
    fetch(`http://localhost:8088/post_tags/${postId}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ post_tags: res });
        let my_selected = []
        res.forEach((opt) => {
          let my_dict = {};
          my_dict['current_post_id'] = Number(postId);
          my_dict['tag_name'] = opt.tag.name;
          my_dict['tag_id'] = opt.tag_id;
          my_dict['post_tag_id'] = opt.id;
          my_selected.push(my_dict)
        })
        this.setState({ selected_tags: my_selected })
      })
  }

  getPostById = () => {
    const { postId } = this.props.match.params;
    return fetch(`http://localhost:8088/posts/${postId}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ post: res })
      })
  }

  handleClickDelete = () => {
    const { postId } = this.props.match.params;
    return fetch(`http://localhost:8088/posts/${postId}`, {
      method: "DELETE"
    }).then(() => {
      this.props.history.push('/posts');
    })
  }

  submit = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Are you sure?</h1>
            <p>You want to delete this post?</p>
            <button className="mr-3 dialog-btn" onClick={onClose}><h5 className="dialog-txt">No</h5></button>
            <button className="dialog-btn"
              onClick={() => {
                this.handleClickDelete();
                onClose();
              }}
            >
              <h5 className="dialog-txt">Yes, Delete</h5>
            </button>
          </div>
        );
      }
    });
  };

  render() {
    const { postId } = this.props.match.params;
    const { post, post_tags } = this.state;
    const strPost = JSON.stringify(post)
    const editLink = `/editpost/${post.id}`
    const newcommentlink = `/newcomment/${post.id}`
    const pub_date = moment(post.publication_date).format('MMM Do, YYYY');
    return (
      <div className="full-post">
        <div className="post-heading">
          <h1>{post.title}</h1>
          <div className="post-controls">
            <i className="fas fa-trash-alt mr-3" onClick={this.submit}></i>
            <Link to={editLink}><i className="fas fa-edit"></i></Link>
            <i className={`fas fa-tags manage-tags-button ${this.state.is_active ? 'active' : ''}`} onClick={this.toggleView} title="Manage Tags"></i>
          </div>

        </div>
        <div className="d-flex flex-row">
          <small className="mr-3"><strong><em>Tags: </em></strong></small>
          {
            post_tags.length > -1 ? (
              post_tags.map((pt) => (<Tag key={pt.id} pt={pt} />))
            ) : (
                ''
              )
          }
        </div>
        <div className={`${this.state.is_hidden ? 'hidden' : ''}`}>
          <Multiselect
            options={this.state.options} // options to display in dropdown
            selectedValues={this.state.selected_tags} // preselected values
            onSelect={this.onSelect} // function to trigger on select event
            onRemove={this.onRemove} // function to trigger on remove event
            displayValue="tag_name" // Property name to display in dropdown options
            placeholder="Select Tags" // Placeholder text
          />
        </div>
        {
          post.header_img ? (
            <img src={post.header_img} />
          ) : (
              <p><i>No Header Image</i></p>
            )
        }
        {
          post.user ? (
            <div className="post-author">
              <i className="fas fa-user mr-2"></i>
              <h4 className="author-name">{post.user.display_name}</h4>
              <h6 className="author-name lg ml-5">{pub_date}</h6>
            </div>
          ) : (
              ''
            )
        }
        <h6 className="mt-4">{post.content}</h6>
        <Link to={newcommentlink}><button type="button" class="btn btn-dark">Add A Comment</button></Link>
      </div>
    )
  }
}

export default withRouter(SinglePost);
