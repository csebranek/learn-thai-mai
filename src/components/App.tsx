import '../App.css';
//import * as Data from './phrases.json'
import {Data} from '../data/phrases.js'
import React, {FunctionComponent, useEffect, useState, useRef} from 'react'
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
import Player from "./Player";

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

export type Variant = "success" | "danger" | "warning" | undefined
const soundsPath = process.env.PUBLIC_URL + '/assets/sounds/';
const speakerIcon = process.env.PUBLIC_URL + '/assets/images/speaker.png';


/*const usePreviousValue = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
    console.log('updating prev val');
    console.log(value);
  });
  return ref.current;
};*/

//TODO set initial state in () below.
export const App:FunctionComponent<IState> = () => {


  const [entered, setEntered] = useState('');
  const [displayAnswer, setDisplayAnswer] = useState();
  const [data] = useState(Data);
  const [subsetData, setSubsetData] = useState(Data);
  const [pos, setPos] = useState(0);
  const [actual, setActual] = useState(Data[0].thai);//used for next answer
  const [answer, setAnswer] = useState(Data[0].thai)

  const [english, setEnglish] = useState(Data[0].english);
  const [thai, setThai] = useState(Data[0].thai);
  const [feedback, setFeedback] = useState("");
  const [currentWord, setCurrentWord] = useState(Data[0].english);
  const [previousWord, setPreviousWord] = useState('');

  const [tries, setTries] = useState(0);
  const [display, setDisplay] = useState('block');
  const [ans, setAns] = useState("warning" as Variant);

  const [category, setCategory] = useState('default');
  const [mode, setMode] = useState('english-to-thai');
  const [soundPath, setSoundPath] = useState<string>('../assets/sounds/beer.m4a')

  const getRan = () => {
    return Math.floor(Math.random() * Math.floor(subsetData.length))
  };



  //TODO update this type as well
  const sendAnswer = (e:any) => {
    e.preventDefault();
    setTries(tries+1);
    setDisplayAnswer(entered);
    let ans = "";
    if (mode == 'english-to-thai') {
      setAnswer(subsetData[pos].thai);
      setPreviousWord(subsetData[pos].english);
      ans = (subsetData[pos].thai === entered) ? "success" : "danger";
    } else {
      setAnswer(subsetData[pos].english);
      setPreviousWord(subsetData[pos].thai);
      ans = (subsetData[pos].english === entered) ? "success" : "danger";
    }
    setAns(ans as Variant);
    let display = "block"
    let p = getRan();
    console.log(p)
    console.log(subsetData[pos])

    setPos(p);
    setActual(subsetData[p].thai);
    setEnglish(subsetData[p].english);
    setThai(subsetData[p].thai);
    if (mode == 'english-to-thai') {
      setCurrentWord(subsetData[p].english)
    } else {
      setCurrentWord(subsetData[p].thai)
    }
    setFeedback(ans);
    setDisplay(display);
console.log(soundsPath);
console.log(subsetData[p].english);
    setSoundPath(soundsPath + subsetData[p].english + '.m4a');

  };

  //TODO update the type to use React.FormEvent<HTMLInputElement>
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16208
  const handleChange = (event:any) => {
    setEntered(event.currentTarget.value)
  };

  const loadAndPlay = () => {
    let aud = new Audio(soundPath);
    aud.play();
  }

  //do this then set other things
  useEffect(() => {
    console.log(soundPath);
  }, [soundPath]);
  useEffect(() => {
    console.log('using effect');
    let p = getRan();
    setPos(p);
    setEnglish(subsetData[p].english)
    setCurrentWord(subsetData[p].english)
    setSoundPath(soundsPath + subsetData[p].english + '.m4a');
  },[subsetData]);

  const changeCategory = (event:any) => {
    //change the subset here and use it!
    let subset: any = [];
    let selectedCategory = event.currentTarget.value;
    if (selectedCategory === 'default'){
      setSubsetData(data)
      let p = getRan();
      setPos(p);
      setEnglish(subsetData[pos].english);
      setCategory(selectedCategory);
      setSoundPath(soundsPath + subsetData[p].english + '.m4a');
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
    console.log(soundsPath)
    console.log(p)
    console.log(subsetData)
    setSoundPath(soundsPath + subsetData[p].english + '.m4a');
  }
  const changeMode = (event:any) => {
    let selectedMode = event.currentTarget.value;
    setMode(selectedMode);
  }

    return (

        <Form onSubmit={sendAnswer} style={{maxWidth:'500px'}}>
          <h3>New word: {currentWord}</h3>
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
          <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Label>Mode</Form.Label>
            <Form.Control as="select" onChange={changeMode} value={mode}>
              <option value="english-to-thai">English to ไทย</option>
              <option value="thai-to-english">ไทย to English</option>
            </Form.Control>
          </Form.Group>
          <Form.Label>Answer</Form.Label>
          <FormControl type="text" name="val" onChange={handleChange} value={entered} required />
          { displayAnswer &&
	  <Alert style={{display: display}}  variant={ans}>You entered: <strong>{displayAnswer}</strong> and answer was:  <strong>{answer} ({previousWord})</strong></Alert>
          }
	  <div style={{float: "right", cursor: "pointer"}}>
	      <img onClick={loadAndPlay} alt="Play answer" src="https://img.icons8.com/color/48/000000/high-volume--v2.png"/>
	  </div>
          <Button variant="primary" type="submit">Submit</Button>
        </Form>
    );
}

export default App;
