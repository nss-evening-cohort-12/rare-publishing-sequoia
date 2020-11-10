import React from 'react'
import { withRouter } from 'react-router-dom'

class Tag extends React.Component {
    render() {
        const { pt } = this.props;
        return (
            <small className="mr-3">{pt.tag.name}</small>
        )
    }
}

export default withRouter(Tag);