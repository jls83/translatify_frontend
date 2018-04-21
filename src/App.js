import React, { Component } from 'react';
import './App.css';

import InputPhrase from './InputController';
import ResultDisplay from './ResultController';
import UserLogin from './LoginController';

class App extends Component {
  constructor(props) {
    super(props);
    this.initState = {
      input_phrase: "Enter your text to translate here!",
      input_language: "",
      output_phrase: "",
      isLoggedIn: true, // for testing!
    };
    this.state = this.initState;

    this.handleNextTranslation = this.handleNextTranslation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
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

  render() {
    const handleInputSubmit = this.handleInputSubmit;
    const handleInputChange = this.handleInputChange;
    const handleNextTranslation = this.handleNextTranslation;

    const inputPhrase = this.state.input_phrase;
    const inputLanguage = this.state.input_language;
    const outputPhrase = this.state.output_phrase;
    const isLoggedIn = this.state.isLoggedIn;

    let displayComponent;

    if (!isLoggedIn) {
      displayComponent = <UserLogin/>;
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
