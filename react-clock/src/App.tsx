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

    // NOTE: can make AMPM a boolean instead of AM vs PM for easy toggling
    const [alarm, setAlarm] = useState({
        "hours": new Date().getHours(),
        "minutes": new Date().getMinutes(),
        "seconds": new Date().getSeconds(),
        "milliseconds": new Date().getMilliseconds(),
        "AMPM": "AM"
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
        if (updatedAlarm.hours >= 12) {
            if (updatedAlarm.hours > 12) {
                updatedAlarm.hours = 1;
            } else {
                updatedAlarm.AMPM = updatedAlarm.AMPM === "AM" ? "PM" : "AM";
            }
        } else if (updatedAlarm.hours < 1) {
            updatedAlarm.hours = 12;
            updatedAlarm.AMPM = updatedAlarm.AMPM === "AM" ? "PM" : "AM";
        }


        
        if (updatedAlarm.minutes > 59) {
            updatedAlarm.minutes = 0;
            updatedAlarm.hours++;
        } else if (updatedAlarm.minutes < 0) {
            updatedAlarm.minutes = 59;
            updatedAlarm.hours--;
        }
        setAlarm(updatedAlarm);
    }

    return (
        <div className="App">
            <TimeComponent clock={clock}></TimeComponent>
            <h1>The date is:</h1>

            <h1>Time until X is:</h1>
            <form onSubmit={(e: any) => { handleOnAlarmSubmit(e) }}>
                <h4>Input alarm here:</h4>
                <input value={alarm.hours} type="number" placeholder="hours" onChange={(e: any) => { handleOnChangeAlarm({ hours: e.target.value * 1 }) }}></input>
                <input value={alarm.minutes} type="number" placeholder="minutes" onChange={(e: any) => { handleOnChangeAlarm({ minutes: e.target.value * 1 }) }}></input>
                <input type="number" placeholder="seconds" onChange={(e: any) => { handleOnChangeAlarm({ seconds: e.target.value * 1 }) }}></input>
                <select value={alarm.AMPM} onChange={(e: any) => { handleOnChangeAlarm({ AMPM: e.target.value }) }}>
                    <option>AM</option>
                    <option>PM</option>
                </select>
                <button type="submit">Set Alarm</button>
            </form>
            <h1>alarm: {alarm.hours}:{alarm.minutes}:{alarm.seconds}{alarm.AMPM}</h1>
        </div>
    )
}

export default App
