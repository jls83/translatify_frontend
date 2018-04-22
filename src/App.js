import React, { Component } from 'react';
import './App.css';
import { Grid, Menu } from 'semantic-ui-react';

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
      isLoggedIn: true, //testing
    };

    this.blankPhraseState = {
      input_phrase: "",
      input_language: "",
      output_phrase: "",
    };

    this.state = this.initState;
    this.baseUrl = "http://localhost:8000/";

    this.handleResponseErrors = this.handleResponseErrors.bind(this);

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
    this.setState({
      input_phrase: "",
      input_language: "",
      output_phrase: ""
    });
  }

  // For InputController
  handleInputChange(event) {
    this.setState({input_phrase: event.target.value});
  }

  handleInputSubmit(event) {
    console.log('A phrase was submitted: ' + this.state.input_phrase);
    const headerToken = "Token " + localStorage.getItem("authToken")
    const data = {
      requested_phrase: this.state.input_phrase
    };
    const headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": headerToken
    });
    fetch(this.baseUrl + "translate/", {
      body: JSON.stringify(data),
      method: 'POST',
      headers: headers
    })
      .then(this.handleResponseErrors)
      .then(response => {
        return response.json();
      })
      .then(json => {
          this.setState({
            input_language: json.input_language,
            output_phrase: json.output_phrase
          });
      })
      .catch((error) => {
        console.log("Error submitting translation request");
        console.log(error);
        this.setState(this.blankPhraseState);
      });
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
    this.setState({
      username: "",
      isLoggedIn: false
    });
    localStorage.removeItem("authToken");
    console.log(this.state.username + "has logged out.");
    event.preventDefault();
  }

  handleResponseErrors (response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  handleLoginSubmit(event) {
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    const headers = new Headers({
      "Content-Type": "application/json"
    });

    fetch(this.baseUrl + "rest-auth/login/", {
      body: JSON.stringify(data),
      method: 'POST',
      headers: headers
    })
      .then(this.handleResponseErrors)
      .then(response => {
        return response.json();
      })
      .then(json => {
        const token = json.key
        localStorage.setItem("authToken", token);
        this.setState({
          isLoggedIn: true,
          password: ""
        });
      })
      .catch((error) => {
        console.log("Error logging in");
        console.log(error);
        this.setState(this.initState);
      });
    event.preventDefault();
  }

  render() {
    const handleUsernameChange = this.handleUsernameChange;
    const handlePasswordChange = this.handlePasswordChange;
    const handleLoginSubmit = this.handleLoginSubmit;
    const handleLogoutSubmit = this.handleLogoutSubmit;

    const handleInputSubmit = this.handleInputSubmit;
    const handleInputChange = this.handleInputChange;
    const handleNextTranslation = this.handleNextTranslation;

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
        <Menu/>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column/>
            <Grid.Column>
              {displayComponent}
            </Grid.Column>
            <Grid.Column/>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;
