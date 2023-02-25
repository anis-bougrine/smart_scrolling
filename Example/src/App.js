import {click_scrolling, smart_scrolling} from "./Smart_Scrolling";
import $ from "jquery";
import logo from './logo.svg';
import './App.css';

function Description(){
  return (
      <p>
      This is smart scrolling example application implemented inside a React environment: {<br />} 
      For each element scroll horizontally on your touch pad or touch screen to feel the difference.{<br />}
      </p>
  );
}

function ToScroll(props){

  if (props.smart){
    return(
      <div className="bloc">
      <div id="prev" onClick={() => {click_scrolling("box1", "left");}}></div>
      <div id="box1"  onScroll={() =>{smart_scrolling("box1");}}>
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
      </div>
      <div id="next" onClick={() => {click_scrolling("box1", "right");}}></div>
    </div>
    );
  } else if (!props.smart){
    return(
      <div className="bloc">
      <div id="box2">
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
      </div>
    </div>
    );
  }

}

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
          This is smart scroll effect:
        </p>
        <ToScroll smart={true}/>
      </header>
    </div>
  );
}

export default App;
