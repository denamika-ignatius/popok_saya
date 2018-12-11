import React, { Component } from 'react';

class ContentBertasbih extends Component {
    render() {
        return (
            <center>
                <h1>{this.props.contentHeader}</h1>
                {/* {this.props.children} */}
            </center>
        )
    }
}

export default ContentBertasbih;