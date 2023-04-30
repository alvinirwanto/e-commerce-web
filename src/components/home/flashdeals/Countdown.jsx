import React, { useEffect, useState } from 'react'
import { calculateDiff } from './utils'

const defaultRemainingTime = {
    seconds: "00",
    minutes: "00",
    hours: "00",
    days: "00",
}

export default function Countdown({ date }) {
    const [timeInMs, setTimeInMs] = useState(date.getTime());
    const [remainingTime, setRemainingTime] = useState();
    // console.log(remainingTime)

    useEffect(() => {
        setTimeInMs(date.getTime());
    }, [date]);

    useEffect(() => {
        const interval = setInterval(() => {
            updateRemainingTime(timeInMs);
        }, 1000);
        return () => clearInterval(interval);
    }, [timeInMs]);

    const updateRemainingTime = (timeInMs) => {
        setRemainingTime(calculateDiff(timeInMs));
    };

    return (
        <div className='text-white flex gap-1 items-center'>
            <span className='bg-secondary-blue w-7 h-9 font-semibold text-base flex justify-center items-center rounded-md'>{remainingTime?.hours.slice(0, 1)}</span>
            <span className='bg-secondary-blue w-7 h-9 font-semibold text-base flex justify-center items-center rounded-md'>{remainingTime?.hours.slice(1, 2)}</span>
            <span className='text-secondary-blue font-semibold'>:</span>
            <span className='bg-secondary-blue w-7 h-9 font-semibold text-base flex justify-center items-center rounded-md'>{remainingTime?.minutes.slice(0, 1)}</span>
            <span className='bg-secondary-blue w-7 h-9 font-semibold text-base flex justify-center items-center rounded-md'>{remainingTime?.minutes.slice(1, 2)}</span>
            <span className='text-secondary-blue font-semibold'>:</span>
            <span className='bg-secondary-blue w-7 h-9 font-semibold text-base flex justify-center items-center rounded-md'>{remainingTime?.seconds.slice(0, 1)}</span>
            <span className='bg-secondary-blue w-7 h-9 font-semibold text-base flex justify-center items-center rounded-md'>{remainingTime?.seconds.slice(1, 2)}</span>
        </div>
    )
}
