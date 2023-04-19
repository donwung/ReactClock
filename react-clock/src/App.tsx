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
        "AM": true
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


    // sudo for 24h AMPM translation
    // make clock innately 24h
    // make ampm affect 24h time
    // hour >= 12 is PM
    // hour < 12 is AM

    // sudo for input two way binding to maintain 24h value but display 12h value
    // 

    const handleOnChangeAlarm = (newTime: any) => {
        console.log(newTime)
        newTime.AM = newTime.AM === "true" ? true : false;
        let updatedAlarm = { ...alarm, ...newTime }

        console.log(updatedAlarm);

        // cycles minutes
        if (updatedAlarm.minutes > 59) {
            updatedAlarm.minutes = 0;
            updatedAlarm.hours++;
        } else if (updatedAlarm.minutes < 0) {
            updatedAlarm.minutes = 59;
            updatedAlarm.hours--;
        }

        // cycles 24h times
        if (updatedAlarm.hours > 23) {
            updatedAlarm.hours = 0;
        } else if (updatedAlarm.hours < 0) {
            updatedAlarm.hours = 23;
        }

        // checks 24h time and sets AMPM
        if (updatedAlarm.hours >= 12) {
            updatedAlarm.AM = false
        } else if (updatedAlarm.hours < 12) {
            updatedAlarm.AM = true;
        }
        setAlarm(updatedAlarm);
    }

    const handleOnChangeAlarmAMPM = (AM: any) => {
        let updatedAlarm = { ...alarm }
        if (AM && alarm.hours > 11) {
            updatedAlarm.hours -= 12
            updatedAlarm.AM = true;
        } else {
            updatedAlarm.hours += 12
            updatedAlarm.AM = false;
        }
        setAlarm(updatedAlarm);
    }

    return (
        <div className="App">
            <TimeComponent clock={clock}></TimeComponent>
            <h1>The date is:</h1>

            <h1>Time until X is:</h1>
            <form onSubmit={(e: any) => { handleOnAlarmSubmit(e) }}>
                <h3>Set alarm here:</h3>
                <input value={alarm.hours} type="number" placeholder="hours" onChange={(e: any) => { handleOnChangeAlarm({ hours: e.target.value * 1 }) }}></input>
                <input value={alarm.minutes} type="number" placeholder="minutes" onChange={(e: any) => { handleOnChangeAlarm({ minutes: e.target.value * 1 }) }}></input>
                <input type="number" placeholder="seconds" onChange={(e: any) => { handleOnChangeAlarm({ seconds: e.target.value * 1 }) }}></input>
                <select value={alarm.AM? "AM": "PM"} onChange={(e: any) => { handleOnChangeAlarmAMPM(e.target.value) }}>
                    <option>AM</option>
                    <option>PM</option>
                </select>
                <button type="submit">Set Alarm</button>
            </form>
            <h1>alarm: {alarm.hours}:{alarm.minutes}:{alarm.seconds}{alarm.AM ? "AM" : "PM"}</h1>

            <div>
                <h3>Displayed alarm:</h3>
                <input value={alarm.hours > 12 ? alarm.hours - 12 : (alarm.hours === 0 ? alarm.hours + 12 : alarm.hours)} type="number" placeholder="hours" disabled></input>
                <input value={alarm.minutes} type="number" placeholder="minutes" disabled></input>
                <input type="number" placeholder="seconds" disabled></input>
                <select >
                    <option value="true" >AM</option>
                    <option value="false">PM</option>
                </select>
            </div>
        </div>
    )
}

export default App
