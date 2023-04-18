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
    const [alarm, setAlarm] = useState({
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
    // updateClock(1000);

    const targetTime = () => {

    }

    const handleOnAlarmSubmit = (e: any) => {
        e.preventDefault();
        console.log(e);
    }

    const handleOnChangeAlarm = (newTime: object) => {
        console.log(newTime)
        let updatedAlarm = { ...alarm, ...newTime }
        console.log(updatedAlarm);
        setAlarm(updatedAlarm);
    }

    return (
        <div className="App">
            <TimeComponent clock={clock}></TimeComponent>
            <h1>The date is:</h1>

            <h1>Time until X is:</h1>
            <form onSubmit={(e: any) => { handleOnAlarmSubmit(e) }}>
                <h4>Input alarm here:</h4>
                <input type="number" placeholder="hours" onChange={(e: any) => { handleOnChangeAlarm({ hours: e.target.value * 1 }) }}></input>
                <input type="number" placeholder="minutes" onChange={(e: any) => { handleOnChangeAlarm({ minutes: e.target.value * 1 }) }}></input>
                <input type="number" placeholder="seconds" onChange={(e: any) => { handleOnChangeAlarm({ seconds: e.target.value * 1 }) }}></input>
                <button type="submit">Set Alarm</button>
            </form>
            <h1>alarm: {alarm.hours}:{alarm.minutes}:{alarm.seconds}.{alarm.milliseconds}</h1>
        </div>
    )
}

export default App
