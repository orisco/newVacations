// External imports
import React, { useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import {useSelector, useDispatch} from "react-redux"
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';

// Local imports
export default function MainMenu () {
const user = useSelector((state) => state.user)
const dispatch = useDispatch()
const [isShown, setIsShown] = useState("")
const history = useHistory()
const cookie = new Cookies();

const capital = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

const logout = () => {
  history.push("/")
  cookie.remove('token');
  setIsShown(false)
  dispatch({
    type: "RESET_ACTION"
  })
}

const add = () => {
  history.push(`/vacations/${user[0].username}`)
  dispatch({
    type: "SHOW_ACTION",
  })
}

const vacations = () => {
  history.push(`/vacations/${user[0].username}`)
  dispatch({
    type: "HIDE_ACTION",
  })
}



if (user && user[0].type === "admin") {
  return (
    <div className="mainNav">
      <div>
      <h1 onClick={()=> history.push(`/vacations/${user[0].username}`)}>the Gateway</h1>
      </div>
      <div className="menu" onMouseLeave={() => setIsShown(false)}>
      <h3 to="/admin" onMouseOver={() => setIsShown(true)} className="link" 
      >{capital(user[0].type)}</h3>
      {isShown === true ? (<div className="menu1">
      <h3 onClick={() => vacations()}>Vacations</h3><h3 onClick={() => add()}>Add Vacation</h3><h3 onClick={() => history.push(`/reports`)}>Reports</h3><h3 onClick={() => logout()}>Logout</h3>
      </div>) : ""}
      </div>
    </div>
  )
} else if (user && user[0].type === "user") {
  return (
    <div className="mainNav">
    <div><h1 onClick={()=> history.push(`/vacations/${user[0].username}`)}>the Gateway</h1></div>
    <div className="menu" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
    <h3>Hi, {capital(user[0].name)}</h3>
    {isShown === true ? (<div><h3 onClick={() => logout()}>Logout</h3></div>) : ""}
    </div>
  </div>
  )
} else {
  return (
    <div className="mainNav">
    <div>
    <h1 style={{color: "white"}} onClick={()=> history.push(`/`)}>the Gateway</h1>
    </div>
    </div>
  )
  }
}
