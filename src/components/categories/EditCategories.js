import React from 'react';
import { withRouter } from 'react-router-dom';
class EditCategory extends React.Component {
  state = {
    name: '',
    id: '',
    catOnLoad: {},
    categories: [],
  }

  componentDidMount() {
    this.getCategoryById()
  }

  getAllCategories = () => {
    return fetch("http://localhost:8088/categories")
      .then(res => res.json())
      .then(res => {
        this.setState({ categories: res })
      })
  }

  getCatById = () => {
    const { id } = this.state
    return fetch(`http://localhost:8088/categories/${id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ catOnLoad: res })
      })
  }



  getCategoryById = () => {
    const { Id } = this.props.match.params;
    return fetch(`http://localhost:8088/categories/${Id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ id: res.id, name: res.name, })
      })
      .then(res => {
        this.getCatById();
      })
      .then(res => {
        this.getAllCategories();
      })
  }

  changeNameEvent = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  EditCategory = (e) => {
    e.preventDefault();
    const { id, name } = this.state

    const { Id } = this.props.match.params;


    const edited_category = {
      id: id,
      name: name
    }

    return fetch(`http://127.0.0.1:8088/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(
        edited_category
      )
    })
      .then(res => {
        console.log(res)
        this.props.history.push(`/categories/`)
      })
      .catch(err => console.error(err))
  }

  render() {
    const { name } = this.state;
    const categories = this.state.categories.map((obj) => { return <option value={obj.id} key={obj.id}>{obj.name}</option> })
    return (
      <div className="form-wrapper">
        <h1 className="text-center mt-3">Edit Category</h1>
        <form>
          <div className="form-group">
          </div>
          <div className="form-group">
            <label htmlFor="name">Category Name</label>
            <input type="text" className="form-control" id="name" value={name} onChange={this.changeNameEvent} />
          </div>
          <button className="btn btn-light" onClick={this.EditCategory}>Submit</button>
          <button className="btn btn-light" onClick={() => this.props.history.push('/categories')}>Cancel</button>
        </form>
      </div>
    )
  }
}




export default withRouter(EditCategory);
