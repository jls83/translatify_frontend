import React, { Component } from 'react';
import './App.css';

export default class UserLogin extends Component {
  render() {
    const handleLoginSubmit = this.props.handleLoginSubmit;
    const handleUsernameChange = this.props.handleUsernameChange;
    const handlePasswordChange = this.props.handlePasswordChange;

    return(
      <div className="UserLogin">
        <form onSubmit={handleLoginSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" onChange={handleUsernameChange}/>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" onChange={handlePasswordChange}/>
          <input type="submit" value="Login"/>
        </form>
      </div>
    );
  }
}
