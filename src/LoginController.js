import React, { Component } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';

import './App.css';

export default class UserLogin extends Component {
  render() {
    const handleLoginSubmit = this.props.handleLoginSubmit;
    const handleUsernameChange = this.props.handleUsernameChange;
    const handlePasswordChange = this.props.handlePasswordChange;
    const username = this.props.username;
    const password = this.props.password;
    const authErrors = this.props.authErrors;

    return(
      <div className="UserLogin">
        <Form onSubmit={handleLoginSubmit}>
          <Form.Field>
            <label>Username:</label>
            <input type="text" id="username" value={username} onChange={handleUsernameChange}/>
          </Form.Field>
          <Form.Field>
            <label>Password:</label>
            <input type="password" id="password" value={password} onChange={handlePasswordChange}/>
          </Form.Field>
          <Button type="submit" color="blue">Login</Button>
        </Form>
        {authErrors.length > 0 ?
          (<UserLoginErrors authErrors={authErrors}/>) :
          (null)
        }
      </div>
    );
  }
}

class UserLoginErrors extends Component {
  render() {
    const authErrors = this.props.authErrors;
    const errorElements = authErrors.map(authError =>
      <p>{authError}</p>
    );


    return(
      <Message error>
        {errorElements}
      </Message>
    );
  }
}
