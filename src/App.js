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
      isLoggedIn: false, // for testing!
    };

    this.state = this.initState;

    this.handleNextTranslation = this.handleNextTranslation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogoutSubmit = this.handleLogoutSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  // For ResultController
  handleNextTranslation(event) {
    console.log("Next translation requested");
    this.setState(this.initState);
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
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleLogoutSubmit (event) {
    console.log(this.state.username + "has logged out.");
    this.setState({
      username: "",
      isLoggedIn: false
    });
    event.preventDefault();
  }

  handleLoginSubmit(event) {
    const url = "http://localhost:8000/rest-auth/login/";
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    const headers = new Headers({
      "Content-Type": "application/json"
    });

    fetch(url, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: headers
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response
      })
      .then(response => {
        this.setState({
          authToken: response.json().key,
          isLoggedIn: true,
          password: ""
        });
      })
      .catch(() => {
        console.log("Error logging in");
        this.setState({username: "", isLoggedIn: false})
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
    const handleLogoutSubmit = this.handleLogoutSubmit;

    const inputPhrase = this.state.input_phrase;
    const inputLanguage = this.state.input_language;
    const outputPhrase = this.state.output_phrase;
    const isLoggedIn = this.state.isLoggedIn;

    let displayComponent;

    if (!isLoggedIn) {
      displayComponent = (<UserLogin
        handleLoginSubmit={handleLoginSubmit}
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
