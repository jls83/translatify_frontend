import React, { Component } from 'react';
import './App.css';

export default class InputPhrase extends Component {
  render() {
    const inputPhrase = this.props.input_phrase;
    const handleSubmit = this.props.handleSubmit;
    const handleChange = this.props.handleChange;
    return(
      <div className="InputPhrase">
        <form onSubmit={handleSubmit}>
          <textarea value={inputPhrase} onChange={handleChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

