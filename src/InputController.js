import React, { Component } from 'react';
import './App.css';
import { Button, Form, Message,TextArea } from 'semantic-ui-react';


export default class InputPhrase extends Component {
  render() {
    const inputPhrase = this.props.input_phrase;
    const inputErrors = this.props.inputErrors;
    const handleSubmit = this.props.handleSubmit;
    const handleChange = this.props.handleChange;

    return(
      <div className="InputPhrase">
        <Form onSubmit={handleSubmit}>
          <TextArea style={{marginBottom: '1em'}} placeholder={"Enter your text to translate here!"} value={inputPhrase} onChange={handleChange} />
          <Button type="submit" color="blue">Submit</Button>
          <InputLengthCheck inputPhraseLength={inputPhrase.length}/>
        </Form>
        {inputErrors.length > 0 ?
          (<InputErrors inputErrors={inputErrors}/>) :
          (null)
        }
      </div>
    );
  }
}

class InputLengthCheck extends Component {
  render() {
    const inputPhraseLength = this.props.inputPhraseLength;
    const remaining = 500 - inputPhraseLength;
    const status = (remaining > 0) ?
      'black' :
      'red';

    return(
      <p style={{color: status, fontStyle: "italic"}}>{remaining} characters remaining</p>
    )
  }
}

class InputErrors extends Component {
  render() {
    const inputErrors = this.props.inputErrors;
    const errorElements = inputErrors.map(inputError =>
      <p>{inputError}</p>
    );


    return(
      <Message error>
        {errorElements}
      </Message>
    );
  }
}
