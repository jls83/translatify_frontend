import React, { Component } from 'react';
import './App.css';

export default class ResultDisplay extends Component {
  render() {
    return(
      <div className="OutputDisplay">
        <form onSubmit={this.props.handleSubmit}>
          <PhraseDisplay phrase_type="InputData" phrase={this.props.input_phrase}/>
          <LanguageDisplay input_language={this.props.input_language}/>
          <PhraseDisplay phrase_type="OutputData" phrase={this.props.output_phrase}/>
          <input type="submit" value="Translate Again?" />
        </form>
      </div>
    );
  }
}

class PhraseDisplay extends Component {
  render() {
    const phraseType = this.props.phrase_type;
    const phrase = this.props.phrase;

    let phraseHeader = '';
    if (phraseType === "InputData") {
      phraseHeader = "You Submitted:"
    }
    else if (phraseType === "OutputData") {
      phraseHeader = "Translated:"
    }

    return(
      <div className={phraseType}>
        <h4>{phraseHeader}</h4>
        <h2>{phrase}</h2>
      </div>
    );
  }
}

class LanguageDisplay extends Component {
  render() {
    const inputLanguage = this.props.input_language;

    return(
      <div className="LanguageDisplay">
        <p>{inputLanguage}</p>
      </div>
    );
  }
}
