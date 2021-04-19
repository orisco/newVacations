import React, { useState } from 'react'
import {useHistory} from "react-router-dom";
import config from '../config/config'

export default function Register() {
const [name, setName] = useState("")
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [error, setError] = useState("")
const history = useHistory()
  
  const registerUser = async () => {
    const res = await fetch (config.siteURL + "/auth/new", {
      method: "post",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({name: name, username: username, password: password})
    })
    const data = await res.json()
    if (data.err === true) return setError(data.msg)
    history.push("/")
  }

  return (
    <div className="page reg">
    <div className="form sign">
    <h1 style={{marginTop: "-37px"}}>Sign up</h1>
        <h3 className={error ? "redAlert" : ""}>{error ? error : `This is where your next vacation begins.`}</h3>
      <label>What is your first name?</label>
        <input type="text" placeholder="Type in your name" onChange={(e) => setName(e.target.value)}></input>
        <label>Create a username</label>
        <input type="text" placeholder="Type in a username" onChange={(e) => setUsername(e.target.value)}></input>
        <label>Create a password</label>
        <input type="text" placeholder="Type in a password" onChange={(e) => setPassword(e.target.value)}></input>
        <button onClick={() => registerUser()}>Register</button>
        <p>Already registered? <span className="link" onClick={() => history.push("/")}>Login</span></p> 
      </div>
      </div>
  )
}
