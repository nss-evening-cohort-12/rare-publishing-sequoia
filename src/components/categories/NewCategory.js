import React from 'react';
import { withRouter } from 'react-router-dom';
import './NewCategory.css';


class NewCategory extends React.Component {
  state = {
    id: '',
    name: '',
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }


  createCategory = (e) => {
    e.preventDefault();
    const { name } = this.state

    const user_id = localStorage.getItem("rare_user_id")

    const new_category = {
        user_id: user_id,
        name: name,
    }
    console.error(new_category)

    fetch("http://127.0.0.1:8088/categories", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          body: JSON.stringify(
              new_category
          )
      })
          .then(res => res.json())
          .then(res => {
              console.error(res);
              this.props.history.push('/category')
         })
}

render() {
  return (
    <div className="form-wrapper">
      <h1 className="text-center mt-3">Create New Category</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Category Name</label>
          <input type="text" className="form-control" id="name" placeholder="Category Name" onChange={this.changeNameEvent} />
        </div>
      <button className="btn btn-light" onClick={this.createCategory}>Create</button>
    </form>
  </div>
  )
}
}

export default withRouter(NewCategory);
