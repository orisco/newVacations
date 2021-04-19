import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import {useHistory} from "react-router-dom";
import config from '../config/config'

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const history = useHistory()
  const cookie = new Cookies();
  // const token = cookie.get('token')
  
  // log out in 10 minutes
  let expireTime = new Date(new Date().getTime() + 10 * 60 * 1000);

  const logIn = async () => {
      const res = await fetch (config.siteURL + "/auth/login", {
      method: "post",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({username, password})
    })
    const data = await res.json()
    if (data.err === true) return setError(data.msg)
    cookie.set('token', data.token, { path: "/", expires: expireTime });
    history.push(`/vacations/${username}`)
  }


  return (
    <div>
      <div className="page">
        <div className="form">

          <h1>Login</h1>

          <h3 className={error ? "redAlert" : ""}>{error ? error : `We are a members-only site. Please login or register.`}</h3>

          <div className="fields">
              <label>Username</label>
              <input type="text" placeholder="Type in your username" onChange={(e) => setUsername(e.target.value)}></input>
              <label>Password</label>
                <input type="password" placeholder="Type in your password" onChange={(e) => setPassword(e.target.value)}></input>
          </div>

          <button onClick={() => logIn()}>Log In</button>
          
          <p>First time here? <span className="link" onClick={() => history.push("/register")}>Sign up</span></p>   
        </div>
      </div>
    </div>
      

  )
}
