import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import Cookies from 'universal-cookie';
import VacationListCard from './VacationListCard';
import {useDispatch, useSelector} from "react-redux"
import Add from './Add';

export default function VacationList() {
  const card = useSelector((state) => state.card)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const cookie = new Cookies();
  const [vacations, setVacations] = useState([])
  const [update, setUpdate] = useState("")
  const [query, setQuery] = useState("")
  
  const history = useHistory()
  const token = cookie.get('token')
  
 

  useEffect(() => {
    (async () => {
        const res = await fetch("http://localhost:2020/users/all", {
          method: "get",
        headers: {'Content-Type':'application/json', 'Authorization': token}
      }) 
        const data = await res.json()
        setVacations(data.results)

        dispatch({
          type: "UPDATE_ACTION",
          payload: {
            name: data.name,
            username: data.username,
            type: data.type,
            token: token
          }
        })
    })()
    // eslint-disable-next-line
  }, [update])

  return (
    <div className="vacayPage">
      <div className="searchBox">
      <input type="text" placeholder="search destinations" onChange={(e) => setQuery(e.target.value.toLowerCase())}></input>
      <i className="fas fa-search"></i>
      </div> 
      <div className="results">
       {user[0].type === "admin" && card.add === true ? <Add setUpdate={setUpdate}/> : ""}
        {query ? vacations.map((vacation, key) => vacation.destination.toLowerCase().includes(query) ? <VacationListCard vacation={vacation} key={key} token={token} setUpdate={setUpdate}/> : "") : vacations ? vacations.map((vacation, key) => <VacationListCard vacation={vacation} key={key} token={token} setUpdate={setUpdate}/>) : history.push("/")}
      
      </div>
    </div>
  )
}
