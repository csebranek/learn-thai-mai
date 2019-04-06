import '../App.css';
//import * as Data from './phrases.json'
import {Data} from '../data/phrases.js'
import React, {FunctionComponent, useEffect, useState} from 'react'
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

//TODO set initial state in () below.
export const App:FunctionComponent<IState> = () => {

  const [entered, setEntered] = useState('');
  const [data] = useState(Data);
  const [subsetData, setSubsetData] = useState(Data);
  const [pos, setPos] = useState(0);
  const [actual, setActual] = useState(Data[0].thai);//used for next answer
  const [answer, setAnswer] = useState(Data[0].thai)

  const [english, setEnglish] = useState(Data[0].english);
  const [feedback, setFeedback] = useState("");

  const [tries, setTries] = useState(0);
  const [score, setScore] = useState(0);
  const [display, setDisplay] = useState('block');

  const [category, setCategory] = useState('default');

  const getRan = () => {
    return Math.floor(Math.random() * Math.floor(subsetData.length))
  };


  //TODO update this type as well
  const sendAnswer = (e:any) => {
    e.preventDefault();
    setTries(tries+1);
    setAnswer(subsetData[pos].thai);
    let ans = (subsetData[pos].thai === entered) ? "success" : "danger";
    if (ans == "success"){
      setScore(score+1);
    } else {
      if (score > 0) {
        setScore(score-1);
      }
    }
    let display = "block"
    let p = getRan();
    console.log(p)
    console.log(subsetData[pos])

    setPos(p);
    setActual(subsetData[p].thai);
    setEnglish(subsetData[p].english);
    setFeedback(ans);
    setDisplay(display);

  };

  //TODO update the type to use React.FormEvent<HTMLInputElement>
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16208
  const handleChange = (event:any) => {
    setEntered(event.currentTarget.value)
  };

  //do this then set other things
  useEffect(() => {
    console.log('using effect');
    let p = getRan();
    setPos(p);
    setEnglish(subsetData[p].english)
  },[subsetData]);

  const changeCategory = (event:any) => {
    //change the subset here and use it!
    let subset = [];
    let selectedCategory = event.currentTarget.value;
    if (selectedCategory === 'default'){
      setSubsetData(data)
      let p = getRan();
      setPos(p);
      setEnglish(subsetData[pos].english);
      setCategory(selectedCategory);
      return;
    }

    //TODO change for loop and make async using useEffect hook
    for (let i=0; i < Object.keys(data).length; i++){
      console.log('calculating subset...')
      if (selectedCategory === data[i].category){
        subset.push(data[i])
      }
    }

    setCategory(selectedCategory);
    console.log(selectedCategory);
    console.log('setting subset...');
    setSubsetData(subset)
    console.log(subsetData)
    console.log('subset set...');
    let p = getRan();
    setCategory(selectedCategory);
    console.log('english...',english)
    console.log(p)
    console.log(subsetData)
  }

    return (

        <Form onSubmit={sendAnswer} style={{maxWidth:'500px'}}>
          <h3>New word: {english}</h3>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Category</Form.Label>
            <Form.Control as="select" onChange={changeCategory} value={category}>
              <option value="default">All</option>
              <option value="general">General</option>
              <option value="dining">Dining</option>
              <option value="location">Location</option>
              <option value="object">Object</option>
            </Form.Control>
          </Form.Group>
          <FormControl type="text" name="val" onChange={handleChange} value={entered} />
          <Alert style={{display: display}}  variant="success"><FormText>You entered: {entered} and answer was {answer}</FormText></Alert>
          <Button variant="primary" type="submit">Submit</Button>
          <Alert style={{float:"right"}} variant="info">Score: {score} / {tries}</Alert>
        </Form>
    );
}

export default App;