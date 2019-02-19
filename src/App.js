import React, { Component } from 'react';
import './App.css';
import {Data} from './phrases.js'

class App extends Component {

  getRan = () => {
    return Math.floor(Math.random() * Math.floor(this.data.length))
  };

  data = Data;

  state = {
    data: this.data,
    loading: false,
    val: '',
    pos: 0,
    text: "Enter new word: \"" + this.data[0].english + "\" ",
    answertext: '',
    entered:'',
    actual:'',
  };

  sendAnswer = e => {
    e.preventDefault();
    this.setState({loading:false});

    if (this.state.data[this.state.pos].thai === this.state.val){
      this.setState({answertext:"good job"});
    }else{
      this.setState({answertext:"bad job"});
    }

    this.setState({actual:this.state.data[this.state.pos].thai});
    this.setState({entered:this.state.val});
    let p = this.getRan();
    //set the new random word
    this.setState({pos:p});
    //set the text with the random word
    //this.setState({text:"You entered " + entered + "Actual " + prev + "Enter new word "+this.state.data[p].english})
    //clear the input
    this.setState({val:''});
    console.log(this.state.pos);

  };

  handleChange = (event) => {
    this.setState({val:event.target.value});
  };

  render() {
    return (
      <div id="form-wrapper">
        <form onSubmit={this.sendAnswer}>
          <h1>{this.state.answertext}</h1>
          <h1>You entered: {this.state.entered} and answer was {this.state.actual}</h1>
          <h1>New word: {this.state.data[this.state.pos].english}</h1>
          <input type="text" name="val" onChange={this.handleChange} value={this.state.val}></input>
        </form>
        <button type="submit">Submit</button>
      </div>
    );
  }
}

export default App;
