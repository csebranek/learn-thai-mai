import '../App.css';
//import * as Data from './phrases.json'
import {Data} from '../data/phrases.js'
import React, {useState} from 'react'
import {JSONResult} from "csvtojson/v2/lineToJson";
import {
  Form,
  Row,
  Container,
  Col,
  FormControl,
  FormLabel,
  FormText,
  FormGroup,
  Button,
  Alert,
  Dropdown
} from 'react-bootstrap';

interface ISomeObject{
  english?:string;
  thai?:string;
  data:JSON;
  subsetData:JSON;
}

interface IState {
  data:JSONResult;
  subsetData:JSONResult;
  category:string;
  val:string;
  pos:number;
  entered:string;
  actual:string;
  feedback:Variant;
  display:string;
  score:number;
  tries:number;
  english:string;
}

export type Variant = "success" | "danger" | undefined

class App extends React.Component<{},IState> {

  getRan = () => {
    return Math.floor(Math.random() * Math.floor(this.state.subsetData.length))
  };

  data = Data;

  state = {
      data: this.data || {},
      subsetData: this.data || {},
      category:'--',
      val: '',
      pos: 0,
      entered:'',
      actual:'',
      feedback: undefined,
      display:"none",
      score:0,
      tries:0,
      english:this.data[0].english
  }

  //TODO update this type as well
  sendAnswer = (e:any) => {
    e.preventDefault();
    let tries = this.state.tries + 1
    let ans = (this.state.subsetData[this.state.pos].thai === this.state.val) ? "success" : "danger";
    let newScore = 0;
    if (ans == "success"){
      newScore = this.state.score+1
    } else {
      if (this.state.score > 0) {
        newScore = this.state.score - 1
      }
    }
    let display = "block"
    let p = this.getRan();
    console.log(p)
    console.log(this.state.subsetData[this.state.pos])
    this.setState({
      actual:this.state.subsetData[this.state.pos].thai,
      entered:this.state.val,
      english:this.state.subsetData[this.state.pos].english,
      pos:p,
      val:'',
      feedback:ans as Variant,
      display:display,
      score:newScore,
      tries:tries
    });

  };

  //TODO update the type to use React.FormEvent<HTMLInputElement>
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16208
  handleChange = (event:any) => {
    this.setState({val:event.currentTarget.value});
  };

  changeCategory = (event:any) => {
    //change the subset here and use it!
    let subset = [];
    let selectedCategory = event.currentTarget.value;
    if (selectedCategory === 'default'){
      this.setState({subsetData:this.state.data}, ()=> {
        let p = this.getRan();
        this.setState({
          pos:p,
          english:this.state.subsetData[p].english,
          category:selectedCategory,
        })
        console.log(p)
        console.log(this.state.subsetData)
      })
      return;
    }

    //TODO change for loop
    for (let i=0; i < Object.keys(this.state.data).length; i++){
      console.log(this.state.data[i]);
      if (selectedCategory === this.state.data[i].category){
        subset.push(this.state.data[i])
      }
    }
    this.setState({category:event.currentTarget.value})
    this.setState({subsetData:subset},() => {
      let p = this.getRan();
      this.setState({pos:p});
      this.setState({english:this.state.subsetData[p].english})
      console.log(p)
      console.log(this.state.subsetData)
    });
  }

  render() {
    return (

        <Form onSubmit={this.sendAnswer} style={{maxWidth:'500px'}}>
          <h3>New word: {this.state.english}</h3>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Category</Form.Label>
            <Form.Control as="select" onChange={this.changeCategory} value={this.state.category}>
              <option value="default">All</option>
              <option value="general">General</option>
              <option value="dining">Dining</option>
              <option value="location">Location</option>
              <option value="object">Object</option>
            </Form.Control>
          </Form.Group>
          <FormControl type="text" name="val" onChange={this.handleChange} value={this.state.val} />
          <Alert style={{display: this.state.display}}  variant={this.state.feedback}><FormText>You entered: {this.state.entered} and answer was {this.state.actual}</FormText></Alert>
          <Button variant="primary" type="submit">Submit</Button>
          <Alert style={{float:"right"}} variant="info">Score: {this.state.score} / {this.state.tries}</Alert>
        </Form>
    );
  }
}

export default App;