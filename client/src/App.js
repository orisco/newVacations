import React from 'react'
import {BrowserRouter as Router,Route} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import VacationList from './components/VacationList';
// import {useSelector} from "react-redux"

// import Cookies from 'universal-cookie';
import MainMenu from './components/MainMenu';
import Reports from './components/Reports';

export default function App() {
  return (
    <Router>     
    <div className="App">
      <MainMenu/>
      <Route path="/" exact component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/reports" component={Reports}/>
      <Route path="/vacations/:username" component={VacationList}/>
    </div>
    </Router>
  )
}
