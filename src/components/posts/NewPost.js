import React from 'react';

class NewPost extends React.Component {
  state = {
    user_id: '',
    category_id: '',
    title: '',
    content: '',
    header_img: '',
  }
  
  render() {
    return (
      <h1 className="text-center mt-3">Create New Post</h1>
    )
  }
}

export default NewPost;
