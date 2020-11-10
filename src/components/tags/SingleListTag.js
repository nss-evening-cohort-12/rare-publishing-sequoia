import React from 'react'
import { withRouter } from 'react-router-dom'

class SingleListTag extends React.Component {
    render() {
        const { tag, handleDeleteTag } = this.props;
        return (
            <div className="tag-list pl-3 d-flex flex-row justify-content-between">
                <h5>{tag.name}</h5>
                <i className="fas fa-trash-alt fa-sm mr-3 my-auto" onClick={() => { handleDeleteTag(tag.id); }}></i>
            </div>
        )
    }
}

export default withRouter(SingleListTag);