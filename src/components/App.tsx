import '../App.css';
//import * as Data from './phrases.json'
import {Data} from '../data/phrases.js'
import * as React from 'react'
import {JSONResult} from "csvtojson/v2/lineToJson";

interface ISomeObject{
  english?:string;
  thai?:string;
  data:JSON
}

class App extends React.Component<{},{data:JSONResult,val:string,pos:number,entered:string,actual:string,feedback:string}> {

  getRan = () => {
    return Math.floor(Math.random() * Math.floor(this.data.length))
  };

  data = Data;

  constructor(){
    super();
    this.state = {
      data: this.data || '',
      val: '',
      pos: 0,
      entered:'',
      actual:'',
      feedback: '',
    };
    this.sendAnswer = this.sendAnswer.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  sendAnswer = (e:any) => {
    e.preventDefault();
    let ans = (this.state.data[this.state.pos].thai === this.state.val) ? 'Good Job' : 'Bad Job';
    let p = this.getRan();
    this.setState({
      actual:this.state.data[this.state.pos].thai,
      entered:this.state.val,
      pos:p,
      val:'',
      feedback:ans,
    });

  };

  handleChange = (target:React.FormEvent<HTMLInputElement>) => {
    this.setState({val:target.currentTarget.value});
  };

  render() {
    return (
      <div id="form-wrapper">
        <form onSubmit={this.sendAnswer}>
          <h1>{this.state.feedback}</h1>
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