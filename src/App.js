import logo from './logo.svg';
import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from "react-router-dom";
import './App.css';
import MainPage from './components/mainPage'
import Game from './components/game'


function App() {
  return (
    <div className="App">
        <Router>
           
            <Switch>
                <Route exact={true} path={'/'}  component={MainPage}/>
                <Route exact={true} path={'/play'}  component={Game}/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
