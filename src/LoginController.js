import React, { Component } from 'react';
import './App.css';

export default class UserLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit (event) {
    console.log(this.state.username, this.state.password);
    event.preventDefault();
  }

  render() {
    return(
      <div className="UserLogin">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" onChange={this.handleUsernameChange}/>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" onChange={this.handlePasswordChange}/>
          <input type="submit" value="Login"/>
        </form>
      </div>
    );
  }
}
