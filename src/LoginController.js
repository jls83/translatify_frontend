import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';

import './App.css';

export default class UserLogin extends Component {
  render() {
    const handleLoginSubmit = this.props.handleLoginSubmit;
    const handleUsernameChange = this.props.handleUsernameChange;
    const handlePasswordChange = this.props.handlePasswordChange;

    return(
      <div className="UserLogin">
        <Form onSubmit={handleLoginSubmit}>
          <Form.Field>
            <label>Username:</label>
            <input type="text" id="username" onChange={handleUsernameChange}/>
          </Form.Field>
          <Form.Field>
            <label>Password:</label>
            <input type="password" id="password" onChange={handlePasswordChange}/>
          </Form.Field>
          <Button type="submit">Login</Button>
        </Form>
      </div>
    );
  }
}
