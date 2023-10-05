import React, { useEffect } from 'react'

interface TimeSelectorProps {
    typing: string;
    setTimeUp: React.Dispatch<React.SetStateAction<boolean>>;
    setTyping: React.Dispatch<React.SetStateAction<string>>;
    btnActive: number;
    setBtnActive: React.Dispatch<React.SetStateAction<number>>;
}

function TimeSelector({ typing, setTimeUp, setTyping, btnActive, setBtnActive }: TimeSelectorProps) {
    const [time, setTime] = React.useState(15)
    const [startCountdown, setStartCountdown] = React.useState(false)
    const onBtnClick = (e: any) => {
        setTyping('')
        setTimeUp(false)
        setStartCountdown(false)
        setTime(e.target.value)
        setBtnActive(e.target.value)
    }

    useEffect(() => {
        if (typing.length == 1) {
            setStartCountdown(true)
        }
    }, [typing])

    useEffect(() => {
        if (time == 0) {
            setTyping('')
            setStartCountdown(false)
            setTimeUp(true)
            setTime(15)
        }
        if (startCountdown && time > 0) {
            const timer = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);

            return () => {
                clearInterval(timer);
            };
        }
    }, [startCountdown, time]);

    return (
        <div className='w-full flex items-center justify-between bg-neutral-content rounded-md p-2 shadow-md'>
            <span className="countdown font-mono text-4xl">
                <span style={{ "--value": time }}></span>
            </span>
            <div className="tabs font-semibold">
                <button value={15} className={btnActive == 15 ? "tab tab-active" : "tab"} onClick={onBtnClick}>15s</button>
                <button value={30} className={btnActive == 30 ? "tab tab-active" : "tab"} onClick={onBtnClick}>30s</button>
                <button value={45} className={btnActive == 45 ? "tab tab-active" : "tab"} onClick={onBtnClick}>45s</button>
                <button value={60} className={btnActive == 60 ? "tab tab-active" : "tab"} onClick={onBtnClick}>60s</button>
            </div>
        </div>
    )
}

export default TimeSelector