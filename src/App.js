import React, { Component } from 'react';
import './App.css';

class InputPhrase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input_phrase: 'Input your text to translate here.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    this.setState({input_phrase: event.target.value});
  }

  handleSubmit(event) {
    console.log('A phrase was submitted: ' + this.state.input_phrase);
    event.preventDefault();
  }

  render() {
    return(
      <div className="InputPhrase">
        <form onSubmit={this.handleSubmit}>
          <textarea value={this.state.input_phrase} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

class OutputDisplay extends Component {
  handleSubmit(event) {
    console.log('Requested another translation');
    event.preventDefault();
  }

  render() {
    return(
      <div className="OutputDisplay">
        <form onSubmit={this.handleSubmit}>
          <PhraseDisplay phrase_type="InputPhrase" phrase={"Buona Pasqua!"} input_language={"Italian"}/>
          <PhraseDisplay phrase_type="OutputPhrase" phrase={"Happy Easter!"}/>
          <input type="submit" value="Translate Again?" />
        </form>
      </div>
    );
  }
}

class PhraseDisplay extends Component {
  render() {
    let language_data = '';
    let phrase_header = '';
    if (this.props.phrase_type === "InputPhrase") {
      language_data = this.props.input_language;
      phrase_header = "You Submitted:"
    }
    else if (this.props.phrase_type === "OutputPhrase") {
      phrase_header = "Translated:"
    }
    return(
      <div className={this.props.phrase_type}>
        <h4>{phrase_header}</h4>
        <h2>{this.props.phrase}</h2>
        <p>{language_data}</p>
      </div>
    );
  }
}

class UserLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit (event) {
    console.log(this.state.username, this.state.password);
    event.preventDefault();
  }

  render() {
    return(
      <div className="UserLogin">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" onChange={this.handleUsernameChange}/>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" onChange={this.handlePasswordChange}/>
          <input type="submit" value="Login"/>
        </form>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <UserLogin/>
      </div>
    );
  }
}

export default App;
