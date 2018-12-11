import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { onUserLogin } from '../actions';

const cookies = new Cookies();

class LoginBertasbih extends Component {

    componentWillReceiveProps(newProps) {
        if(newProps.username !== '') {
            cookies.set('Ferguso', newProps.username, { path: '/' })
        }
    }

    onBtnLoginClick = () => {
        var username = this.refs.username.refs.tbUsername.value;
        var password = this.refs.password.refs.tbPassword.value;
        this.props.onUserLogin({username, password})
    }

    renderError = () => {
        if(this.props.error.length > 0) {
            return <p className="alert alert-danger">{this.props.error}</p>;
        }
    }

    renderButton = () => {
        if(this.props.loading) {
            return <i className="fa fa-spinner fa-spin" style={{ fontSize: '54px' }}/>
        }
        return <Button color="success"
                    onClick={this.onBtnLoginClick}>
                    Login
                </Button>
    }

    render() {
        if(this.props.username === "") {
            return (
                <div>
                    <Form style={{ margin: "0 auto", paddingTop: "50px"}} className="col-3">
                        <FormGroup>
                            <Label for="exampleUsername">Username</Label>
                            <Input type="text" name="username" ref="username" innerRef="tbUsername" id="exampleUsername" placeholder="Username" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input type="password" name="password" ref="password" innerRef="tbPassword" id="examplePassword" placeholder="Your Password" />
                        </FormGroup>
                        {this.renderError()}
                        {this.renderButton()}
                    </Form>
                </div>
            );
        }
        
        return <Redirect to="/" />
    }
}

const mapStateToProps = (state) => {
    return { 
        username: state.auth.username, 
        error: state.auth.error, 
        loading: state.auth.loading
    };
}

export default connect(mapStateToProps, { onUserLogin })(LoginBertasbih);
