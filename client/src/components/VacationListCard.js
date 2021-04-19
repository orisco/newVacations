import React, { useState } from 'react'
import {useSelector} from "react-redux"
import Edit from './Edit'
import config from '../config/config'

export default function VacationListCard({vacation, token, setUpdate}) {
  const state = useSelector((state) => state.user)
  const [edit, setEdit] = useState(false)
  

  const adminDelete = async () => {
    const id = vacation.vacation_id
      const res = await fetch (config.siteURL + `/admin/delete/${id}`, {
      method: "delete",
      headers: {'Content-Type':'application/json', 'Authorization': token}
    })
    await res.json()
    setUpdate(id)
  }

  const adminEdit = () => {
    setEdit(!edit)
  }

  const follow = async (binary) => {
    console.log(binary)
    const id = vacation.vacation_id
    await fetch (config.siteURL + `/users/like/${id}`, {
      method: "put",
      headers: {'Content-Type':'application/json', 'Authorization': token},
      body: JSON.stringify({binary})

    })
    setUpdate({id, binary})
  }


  const fixDate = (date) => {
    const months = ["undefined", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const month = date.slice(5,6) === "0" ? months[date.slice(6,7)] : months[date.slice(5,7)]
    return (`${month} ${date.slice(8,10)}, ${date.slice(0,4)}`)
    
  }

  return (
    <div className="card">
      {edit ? 
      <Edit vacation={vacation} setEdit={setEdit} setUpdate={setUpdate}/> : 
      <div>
        <div className="background_image" style={{backgroundImage: "url(" +  vacation.image + ")"}}>
          <h1>{vacation.destination.toUpperCase()}</h1>
      </div>
      <div className="info">
          <h2>{vacation.description}</h2>
          <h3><span className="title">Accommodation: </span>{vacation.accommodation}</h3>
          <h3><span className="title">Available from:</span> {fixDate(vacation.start_date.slice(0, 10))} - {fixDate(vacation.end_date.slice(0, 10))}</h3>
          <h3><span className="title">Starting at:</span> ${vacation.price}</h3>
          <p>Likes: {vacation.followers}</p>

          {state[0].type === "admin" ? 
          (<div className="adminButton">
            {/* <button onClick={() => adminAdd()}>add</button> */}
            <button onClick={() => adminEdit()}>edit</button> 
            <button onClick={() => adminDelete()}>delete</button>
            </div>) :
            <div className="likeButton"><i className={vacation.follow === 1 ? "fas fa-heart like" : "fas fa-heart dislike"} onClick={() => follow(vacation.follow)}></i></div>} 
            </div>
            </div>}
    </div>
  )
}
