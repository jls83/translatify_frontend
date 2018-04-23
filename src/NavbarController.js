import React, { Component } from 'react';
import './App.css';
import { Menu } from 'semantic-ui-react';

export default class Navbar extends Component {
  render() {
    const handleLogoutSubmit = this.props.handleLogoutSubmit;
    const isLoggedIn = this.props.isLoggedIn;
    const logoutButton = isLoggedIn ?
      (<Menu.Item name='logout' onClick={handleLogoutSubmit}/>) :
      (null)

    return(
      <Menu size='huge' color='blue' inverted>
        <Menu.Item style={{fontWeight: "bold"}}>Translatify</Menu.Item>
        <Menu.Item href="https://github.com/jls83/translatify_frontend" target="_blank">GitHub - Frontend</Menu.Item>
        <Menu.Item href="https://github.com/jls83/translatify_backend" target="_blank">GitHub - Backend</Menu.Item>
        <Menu.Menu position='right'>
          {logoutButton}
        </Menu.Menu>
      </Menu>
    );
  }
}
