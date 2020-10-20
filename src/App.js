import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Home from './Components/Home'
import AddEnrollee from './Components/AddEnrollee'
import AddDependent from './Components/AddDependent';
import UpdateEnrollee from './Components/UpdateEnrollee'
import UpdateDependent from './Components/UpdateDependent'
import BlueBuilding from './Components/bluebuilding.jpg'


function App() {
  return (
    <div>
      <div style={{marginLeft:"20%", marginBottom:0, opacity:"0.4" }}>
        {/* <img src={BlueBuilding} style={{ borderRadius:"0 0 8px 8px", width:"77.5%"}}  alt="noimg"/>  */}
         {/* style={{ position: "absolute", left: "0", top: "20%", width: "25%" }}>hello</p> */}
         {/* <h1 style={{position:"absolute", marginBottom:"20px"}}>Hello</h1> */}
      </div>
      <div className="content">
        <BrowserRouter>
          <Switch>
            <Route path='/addEnrollee' component={AddEnrollee}/>
            <Route path='/addDependent/:id' component={AddDependent}/>
            <Route path='/updateEnrollee/:id' component={UpdateEnrollee}/>
            <Route path='/updateDependent/:id' component={UpdateDependent}/>
            <Route path='/'  component={Home}/> 
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
