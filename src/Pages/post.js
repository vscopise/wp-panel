import React, { Component, Fragment } from 'react'


class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            post: props,
        }
    }

    render() {
        const { editorState } = this.state;
        return (
            <Fragment>
                <h2>CKEditor</h2>
                
                
            </Fragment>
        )
    }
}

export default Post