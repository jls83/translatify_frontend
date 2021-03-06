import React, { Component } from 'react';
import './App.css';
import { Grid } from 'semantic-ui-react';

import InputPhrase from './InputController';
import ResultDisplay from './ResultController';
import UserLogin from './LoginController';
import Navbar from './NavbarController';

const apiServer = "https://translatifyapi.sandco.io/";

class App extends Component {
  constructor(props) {
    super(props);
    this.initState = {
      input_phrase: "",
      input_language: "",
      output_phrase: "",
      username: "",
      password: "",
      isLoggedIn: false,
      authErrors: [],
      inputErrors: [],
    };

    this.blankPhraseState = {
      input_phrase: "",
      input_language: "",
      output_phrase: "",
    };

    this.state = this.initState;
    this.baseUrl = apiServer;

    this.handleResponseErrors = this.handleResponseErrors.bind(this);

    this.handleNextTranslation = this.handleNextTranslation.bind(this);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogoutSubmit = this.handleLogoutSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  componentDidMount() {
    const storageUsername = sessionStorage.getItem('translatifyUsername');
    const storageAuthToken = sessionStorage.getItem('translatifyAuthToken');

    if (storageUsername && storageAuthToken) {
      this.setState({
        username: storageUsername,
        isLoggedIn: true,
      });
    }
  }

  // For ResultController
  handleNextTranslation(event) {
    console.log("Next translation requested");
    this.setState({
      input_phrase: "",
      input_language: "",
      output_phrase: "",
      inputErrors: [],
    });
  }

  // For InputController
  handleInputChange(event) {
    this.setState({input_phrase: event.target.value});
  }

  handleInputSubmit(event) {
    if (this.state.input_phrase.length < 3) {
      this.state.inputErrors.push("The phrase you submitted was too short; phrases must be at least 3 characters");
      this.setState(this.state);
      return;
    }
    if (this.state.input_phrase.length > 500) {
      this.state.inputErrors.push("The phrase you submitted was too long");
      this.setState(this.state);
      return;
    }


    console.log('A phrase was submitted: ' + this.state.input_phrase);
    const headerToken = "Token " + sessionStorage.getItem("translatifyAuthToken")
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
      headers: headers,
      "Access-Control-Allow-Origin": "*"
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
    sessionStorage.removeItem("translatifyUsername");
    sessionStorage.removeItem("translatifyAuthToken");
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
    const username = this.state.username;

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
        sessionStorage.setItem("translatifyAuthToken", token);
        sessionStorage.setItem("translatifyUsername", username);
        this.setState({
          isLoggedIn: true,
          password: ""
        });
      })
      .catch((error) => {
        console.log("Error logging in");
        console.log(error);
        this.setState({
          username: "",
          password: "",
        });
        this.state.authErrors.push("There was an error logging in; please try again");
      });
    //event.preventDefault();
  }

  render() {
    const inputPhrase = this.state.input_phrase;
    const inputLanguage = this.state.input_language;
    const outputPhrase = this.state.output_phrase;

    const isLoggedIn = this.state.isLoggedIn;
    const authErrors = this.state.authErrors;
    const inputErrors = this.state.inputErrors;

    let displayComponent;

    if (!isLoggedIn) {
      displayComponent = (<UserLogin
        username={this.state.username}
        password={this.state.password}
        handleLoginSubmit={this.handleLoginSubmit}
        handleUsernameChange={this.handleUsernameChange}
        handlePasswordChange={this.handlePasswordChange}
        authErrors={authErrors}
      />);
    }
    else if (inputLanguage === "") {
      displayComponent = (<InputPhrase
        input_phrase={inputPhrase}
        handleSubmit={this.handleInputSubmit}
        handleChange={this.handleInputChange}
        inputErrors={inputErrors}
      />);
    }
    else {
      displayComponent = (<ResultDisplay
        input_phrase={inputPhrase}
        input_language={inputLanguage}
        output_phrase={outputPhrase}
        handleSubmit={this.handleNextTranslation}
      />);
    }

    return (
      <div className="App">
        <Navbar handleLogoutSubmit={this.handleLogoutSubmit} isLoggedIn={this.state.isLoggedIn}/>
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
