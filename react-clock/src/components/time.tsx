import { useState, useEffect } from "react";
const TimeComponent: any = (props: any) => {

    const { clock } = props;
    // console.log("default time set");

    const AMPM: any = (hours: number) => {
        if (hours > 12) {
            return (
                <>
                    PM
                </>
            )
        } else {
            return (
                <>
                    AM
                </>
            )
        }
    }

    const AMPMTime: any = (hours: number) => {
        if (hours > 12) { //PM
            return (
                <>
                    {hours - 12}
                </>
            )
        } else { //AM
            return (
                <>
                    {hours === 0 ? 12 : hours}
                </>
            )
        }
    }

    return (
        <div>
            <h1>The time is:</h1>
            <h1>
                {AMPMTime(clock.hours)}:
                {clock.minutes}:
                {clock.seconds}
                {AMPM(clock.hours)}
            </h1>
        </div>
    )
}

export default TimeComponent;