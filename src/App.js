import React, { Component } from 'react';
import './App.css';

import InputPhrase from './InputController';
import ResultDisplay from './ResultController';
import UserLogin from './LoginController';

const testState = {
  input_phrase: "Buona pasqua!",
  input_language: "Italian",
  output_phrase: "Happy Easter!",
};

class App extends Component {
  constructor(props) {
    super(props);
    const testState = {
      input_phrase: "Enter your text to translate here!",
      input_language: "Italian",
      output_phrase: "Happy Easter!",
    };
    this.state = testState;

    this.handleNextTranslation = this.handleNextTranslation.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInputSubmit = this.handleInputSubmit.bind(this)
  }

  // For ResultController
  handleNextTranslation(event) {
    console.log("Next translation requested");
    event.preventDefault();
  }

  // For InputController
  handleInputChange(event) {
    this.setState({input_phrase: event.target.value});
  }

  handleInputSubmit(event) {
    console.log('A phrase was submitted: ' + this.state.input_phrase);
    event.preventDefault();
  }

  render() {
    const inputPhrase = this.state.input_phrase;
    const inputLanguage = this.state.input_language;
    const outputPhrase = this.state.output_phrase;
    const handleInputSubmit = this.handleInputSubmit;
    const handleInputChange = this.handleInputChange;
    const handleSubmit = this.handleNextTranslation;
    return (
      <div className="App">
        <InputPhrase
          input_phrase={inputPhrase}
          handleSubmit={handleInputSubmit}
          handleChange={handleInputChange}
        />
        {/*
        <ResultDisplay
          input_phrase={inputPhrase}
          input_language={inputLanguage}
          output_phrase={outputPhrase}
          handleSubmit={handleSubmit}
        />
        */}
      </div>
    );
  }
}

export default App;
