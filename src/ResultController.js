import React, { Component } from 'react';
import './App.css';
import { Button, Label, Segment } from 'semantic-ui-react';

export default class ResultDisplay extends Component {
  render() {
    return(
      <div className="OutputDisplay">
        <PhraseDisplay phrase_type="InputData" phrase={this.props.input_phrase} input_language={this.props.input_language}/>
        <br />
        <PhraseDisplay phrase_type="OutputData" phrase={this.props.output_phrase}/>
        <br />
        <Button type="submit" onClick={this.props.handleSubmit}>Translate Again?</Button>
      </div>
    );
  }
}

class PhraseDisplay extends Component {
  render() {
    const phraseType = this.props.phrase_type;
    const phrase = this.props.phrase;
    const inputLanguage = this.props.input_language;

    let phraseHeader = '';
    if (phraseType === "InputData") {
      phraseHeader = "You Submitted:"
    }
    else if (phraseType === "OutputData") {
      phraseHeader = "Translated:"
    }

    return(
      <div className={phraseType}>
        <Segment size={'huge'}>
          <Label attached='top'>{phraseHeader}</Label>
          <p>{phrase}</p>
          {inputLanguage ?
            (<LanguageDisplay input_language={inputLanguage}/>) :
            (null)
          }
        </Segment>
      </div>
    );
  }
}

class LanguageDisplay extends Component {
  render() {
    const inputLanguage = this.props.input_language;

    return(
      <Label size={'small'}>
        <p>{inputLanguage}</p>
      </Label>
    );
  }
}
