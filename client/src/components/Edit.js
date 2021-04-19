import React, { useState } from 'react'
import {useSelector} from "react-redux"
import config from '../config/config'

export default function Edit({vacation, setEdit, setUpdate}) {
  const state = useSelector((state) => state.user)
  const [destination, setDestination] = useState("")
  const [description, setDescription] = useState("")
  const [accommodation, setAccommodation] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")


  const submitEdit = async () => {
    if(!destination || !description || !accommodation || !startDate || !endDate || !price || !image) return alert("you must fill-in all fields")
    await fetch (config.siteURL + `/admin/update/${vacation.vacation_id}`, {
    method: "put",
    headers: {'Content-Type':'application/json', 'Authorization': state[0].token},
    body: JSON.stringify({destination, description, accommodation, start_date: startDate, end_date: endDate, price, image})
  })
  setEdit(false)
  setUpdate(destination)
  }
  
  return (
    <div>
      <div className="info_edit" >
      <input type="text" placeholder={vacation.image} onChange={(e) => setImage(e.target.value)}></input>
      <input type="text" placeholder={vacation.destination} onChange={(e) => setDestination(e.target.value)}></input>
  <input type="text" placeholder={vacation.description} onChange={(e) => setDescription(e.target.value)}></input>
      <input type="text" placeholder={vacation.accommodation} onChange={(e) => setAccommodation(e.target.value)}></input>
      <input type="date" placeholder={vacation.start_date.slice(0, 10)} onChange={(e) => setStartDate(e.target.value)}></input>
      <input type="date" placeholder={vacation.end_date.slice(0, 10)} onChange={(e) => setEndDate(e.target.value)}></input>
      <input type="number" placeholder={`$ ${vacation.price}`} onChange={(e) => setPrice(e.target.value)}></input>
      <div className="buttons">
        <button onClick={() => submitEdit()}>Save</button>
        <button onClick={() => setEdit(false)}>Discard</button></div> 
      </div> 
      </div>
  )
}
