import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import { useHistory } from 'react-router';
import { VictoryBar, VictoryChart, VictoryLabel } from 'victory';

export default function Reports() {
  const state = useSelector((state) => state.user)
  const history = useHistory()
  const [vacations, setVacations] = useState([])

  useEffect(() => {
    (async () => {
        const res = await fetch("http://localhost:2020/users/all", {
          method: "get",
        headers: {'Content-Type':'application/json', 'Authorization': state[0].token}
      }) 
        const data = await res.json()
        if (data.results) {
          setVacations(data.results.filter(v => v.followers > 0).map(v =>({destination: v.destination ,followers: v.followers, label: v.followers})))
        } else {history.push(`/`)}
    })()
  }, [state])

  return (
    <div className="reports">
      <div className="chart">
      <VictoryChart domainPadding={{x: [40, 20], y: [0, 0]}} width={1300} height={800}>
        <VictoryBar labels={({ datum }) => datum.y} data={vacations} 
        style={{
          data: {fill: "rgb(209, 69, 69)", width: 30, fontSize: 30},
          labels: { padding: 10, fontSize: 20, fontFamily: "Barlow", fill: "white" } 
        }}
        labelComponent={<VictoryLabel dy={30} />}
        x="destination" 
        y="followers"/>
        </VictoryChart>
    </div> 
    
    </div>
  )
}
