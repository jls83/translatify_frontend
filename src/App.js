import React, { Component } from 'react';
import './App.css';

import InputPhrase from './InputController';
import ResultDisplay from './ResultController';
import UserLogin from './LoginController';

class App extends Component {
  constructor(props) {
    super(props);
    this.initState = {
      input_phrase: "",
      input_language: "",
      output_phrase: "",
      username: "",
      password: "",
      isLoggedIn: true, // for testing!
    };
    this.state = this.initState;

    this.handleNextTranslation = this.handleNextTranslation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleLogoutSubmit = this.handleLoginSubmit.bind(this);
  }

  // For ResultController
  handleNextTranslation(event) {
    console.log("Next translation requested");
    this.state = this.initState;
  }

  // For InputController
  handleInputChange(event) {
    this.setState({input_phrase: event.target.value});
  }

  handleInputSubmit(event) {
    console.log('A phrase was submitted: ' + this.state.input_phrase);
    this.setState({input_language: 'it'});
    event.preventDefault();
  }

  // For LoginController
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

  handleLoginSubmit (event) {
    console.log(this.state.username + "has logged in.");
    this.setState({
      password: "",
      isLoggedIn: true
    });
    event.preventDefault();
  }

  handleLogoutSubmit (event) {
    console.log(this.state.username + "has logged out.");
    this.setState({
      username: "",
      password: "",
      isLoggedIn: false
    });
    event.preventDefault();
  }

  render() {
    const handleInputSubmit = this.handleInputSubmit;
    const handleInputChange = this.handleInputChange;
    const handleNextTranslation = this.handleNextTranslation;
    const handleUsernameChange = this.handleUsernameChange;
    const handlePasswordChange = this.handlePasswordChange;
    const handleLoginSubmit = this.handleLoginSubmit;
    const handleLogoutSubmit = this.handleLoginSubmit;

    const inputPhrase = this.state.input_phrase;
    const inputLanguage = this.state.input_language;
    const outputPhrase = this.state.output_phrase;
    const isLoggedIn = this.state.isLoggedIn;

    let displayComponent;

    if (!isLoggedIn) {
      displayComponent = (<UserLogin
        handleSubmit={handleLoginSubmit}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
      />);
    }
    else if (inputLanguage === "") {
      displayComponent = (<InputPhrase
        input_phrase={inputPhrase}
        handleSubmit={handleInputSubmit}
        handleChange={handleInputChange}
      />);
    }
    else {
      displayComponent = (<ResultDisplay
        input_phrase={inputPhrase}
        input_language={inputLanguage}
        output_phrase={outputPhrase}
        handleSubmit={handleNextTranslation}
      />);
    }

    return (
      <div className="App">
        {displayComponent}
      </div>
    );
  }
}

export default App;
