import {click_scrolling, smart_scrolling} from "./Smart_Scrolling";
import logo from './logo.svg';
import './App.css';
import text from "./long_text.js";

/**
* Render <p> element containing description.
*
* @param {undefined} undefined.
* @returns {undefined} undefined.
*/
function Description(){
  return (
      <p>
      This is smart scrolling example application implemented inside a React environment: {<br />} 
      For each element scroll horizontally on your touch pad or touch screen to feel the difference.{<br />}
      </p>
  );
}

/**
* render scrolling element can be cutomized by props.
*
* @param {object} props - { smart: false, dynamic: false }
* @returns {undefined} undefined.
*/
function ToScroll(props){
  return(
    <div className={!props.dynamic?("bloc"):("")} id={props.dynamic?("bloc-text"):("")}>
      {props.smart ? (
    <div className="prev" onClick={props.dynamic?(() => {click_scrolling("long_text", "left");}):(() => {click_scrolling("box1", "left");})}></div>
      ):(
      <div></div>
      )}
    <div id={props.smart ? ("box1"):("box2")}  onScroll={props.smart ? (() =>{smart_scrolling("box1");}):(()=>{})}>
      {props.dynamic?(
        <p id="long_text" onScroll={() =>{smart_scrolling("long_text");}}>
          {text}
        </p>
      ):(
        <div className="movingbox1">
          <div className="page1">
            <p className="pages">PAGE X</p>
          </div>
          <div className="page2" >
            <p className="pages" >PAGE Y</p>
          </div>
          <div className="page3">
            <p className="pages">PAGE Z</p>
          </div>
        </div>
      )}
    </div>
    {props.smart ? (
    <div className="next" onClick={props.dynamic?(() => {click_scrolling("long_text", "right");}):(() => {click_scrolling("box1", "right");})}></div>
    ):(
      <div></div>
      )}
  </div>
  );
}
ToScroll.defaultProps = {
  smart:false,
  dynamic: false
};

/**
* Render 3 scrolling elements, each is specific by its props.
*
* @param {undefined} undefined.
* @returns {undefined} undefined.
*/
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Description />
        <p>
          This is default scroll behaviour:
        </p>
        <ToScroll smart={false}/>
        <p>
          This is smart scroll effect for static overflow:
        </p>
        <ToScroll smart={true}/>
        <p>
          This is smart scroll effect for dynamic overflow:
        </p>
        <ToScroll smart={true} dynamic={true}/>
        <br></br>
      </header>
    </div>
  );
}

export default App;
