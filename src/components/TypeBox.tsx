import React, { useEffect, useState } from 'react'
import Typing from './Sentence'
import Sentence from './Sentence'
import TimeSelector from './TimeSelector'
import axios from 'axios'

interface TypeBoxProps {
    typing: string;
    setTyping: React.Dispatch<React.SetStateAction<string>>;
    timeUp: boolean
    setTimeUp: React.Dispatch<React.SetStateAction<boolean>>;
}
function TypeBox({ typing, setTyping, timeUp, setTimeUp }: TypeBoxProps) {
    const [sentence, setSentence] = React.useState<string>('')
    const [totalWordCount, setTotalWordCount] = useState(0);
    const [wrongWordCount, setWrongWordCount] = useState(0);
    const [btnActive, setBtnActive] = React.useState(15)

    useEffect(() => {
        const fetchSentence = async () => {
            const { data } = await axios.get('https://random-word-api.herokuapp.com/word?number=75&length=4')
            setSentence(data.join(' '))
        }
        if (timeUp == true) {
            fetchSentence()
        }
    }, [timeUp])

    useEffect(() => {
        const fetchSentence = async () => {
            const { data } = await axios.get('https://random-word-api.herokuapp.com/word?number=75&length=4')
            setSentence(data.join(' '))
        }
        fetchSentence()
    }, [])
    return (
        <div className='h-full flex flex-col py-40 px-2 items-center gap-40 w-full'>
            <TimeSelector typing={typing} setTimeUp={setTimeUp} setTyping={setTyping} btnActive={btnActive} setBtnActive={setBtnActive} />
            {
                timeUp ? (
                    <div className='flex gap-10 flex-col text-5xl w-full justify-center items-center'>
                        <div className='flex-row flex gap-10 justify-center'>
                            <h1>WPM : {Math.floor((totalWordCount - wrongWordCount) * 60 / btnActive)}</h1>
                            <h1>Accuracy : {Math.floor(((totalWordCount - wrongWordCount) / totalWordCount) * 100)}%</h1>
                        </div>
                        <button className='btn btn-accent w-1/12' onClick={(e) => { setTimeUp(false) }}>Restart</button>
                    </div>) :
                    <Sentence typing={typing} sentence={sentence} totalWordCount={totalWordCount} setTotalWordCount={setTotalWordCount} wrongWordCount={wrongWordCount} setWrongWordCount={setWrongWordCount} />

            }
        </div >
    )
}

export default TypeBox