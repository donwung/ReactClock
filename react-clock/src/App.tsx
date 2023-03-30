import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TimeComponent from './components/time';

function App() {
  const [clock, setClock] = useState({
    "hours": new Date().getHours(),
    "minutes": new Date().getMinutes(),
    "seconds": new Date().getSeconds(),
    "milliseconds": new Date().getMilliseconds()
  })

  const updateClock = (rate: number) => {
    setInterval(() => {
      setClock({
        "hours": new Date().getHours(),
        "minutes": new Date().getMinutes(),
        "seconds": new Date().getSeconds(),
        "milliseconds": new Date().getMilliseconds()
      })
    }, rate);
  }

  updateClock(1000);

  return (
    <div className="App">
      <TimeComponent clock={clock}></TimeComponent>
      <h1>The date is:</h1>

      <h1>Time until X is:</h1>

    </div>
  )
}

export default App
