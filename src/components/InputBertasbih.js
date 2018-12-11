import React, { Component } from 'react';

class InputBertasbih extends Component {
    render() {
        return (
            <input type={this.props.type} ref={this.props.innerRef} />
        )
    }
}

export default InputBertasbih;
