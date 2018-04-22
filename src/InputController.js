import React, { Component } from 'react';
import './App.css';
import { Button, Form, TextArea } from 'semantic-ui-react';


export default class InputPhrase extends Component {
  render() {
    const inputPhrase = this.props.input_phrase;
    const handleSubmit = this.props.handleSubmit;
    const handleChange = this.props.handleChange;

    return(
      <div className="InputPhrase">
        <Form onSubmit={handleSubmit}>
          <TextArea style={{marginBottom: '1em'}} placeholder={"Enter your text to translate here!"} value={inputPhrase} onChange={handleChange} />
          <br />
          <Button type="submit" color="blue">Submit</Button>
        </Form>
      </div>
    );
  }
}

