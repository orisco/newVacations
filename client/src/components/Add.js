import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Cookies from 'universal-cookie';
import config from '../config/config'

export default function Add( {setUpdate}) {
  const cookie = new Cookies();
  const token = cookie.get('token')
  const dispatch = useDispatch()
  const [destination, setDestination] = useState("")
  const [description, setDescription] = useState("")
  const [accommodation, setAccommodation] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")

  const addVacation = async () => {
    if(!destination || !description || !accommodation || !startDate || !endDate || !price || !image) return alert("you must fill-in all fields")
    await fetch (config.siteURL + `/admin/add`, {
      method: "post",
      headers: {'Content-Type':'application/json', 'Authorization': token},
      body: JSON.stringify({destination, description, accommodation, start_date: startDate, end_date: endDate, price, image})
    })
    dispatch({type: "HIDE_ACTION"})
    setUpdate(destination)
  }


  const discard = () => {
    dispatch({type: "HIDE_ACTION"})
    setUpdate(destination)
  }

  return (

      <div className="card">
      <div className="info_edit" >
      <input type="text" placeholder="image" onChange={(e) => setImage(e.target.value)}></input>
      <input type="text" placeholder="destination" onChange={(e) => setDestination(e.target.value)}></input>
  <input type="text" placeholder="description" onChange={(e) => setDescription(e.target.value)}></input>
      <input type="text" placeholder="accommodation" onChange={(e) => setAccommodation(e.target.value)}></input>
      <input type="date" placeholder="start date" onChange={(e) => setStartDate(e.target.value)}></input>
      <input type="date" placeholder="end date" onChange={(e) => setEndDate(e.target.value)}></input>
      <input type="number" placeholder="price" onChange={(e) => setPrice(e.target.value)}></input>
      <div className="buttons">
        <button onClick={() => addVacation()}>Add</button>
        <button onClick={() => discard()}>Discard</button>
      </div>
      </div> 
      </div>
  )
}
