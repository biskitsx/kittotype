import React, { useEffect } from 'react'
import Typing from './Sentence'
import Sentence from './Sentence'
import TimeSelector from './TimeSelector'

function TypeBox({ typing, setTyping }: { typing: string, setTyping: React.Dispatch<React.SetStateAction<string>> }) {
    const sentence = "run jump swim fly drive sail i you have has apple banana orange mango watermelon grapefruit pineapple strawberry cherry lemon lime pear peach plum apricot coconut fig grape guava kiwi nectarine papaya pomegranate raspberry tangerine tomato avocado blackberry blackcurrant blueberry boysenberry currant gooseberry lychee mandarin melon cantaloupe honeydew nut peach nectarine persimmon plantain plum prune pineapple pomegranate quince raisin raspberry rambutan redcurrant salal salak satsuma star fruit tamarillo tamarind ugli fruit watermelon"
    const [timeUp, setTimeUp] = React.useState(false)

    return (
        <div className='h-full flex flex-col p-40 items-center gap-40 w-10/12'>
            <TimeSelector typing={typing} setTimeUp={setTimeUp} setTyping={setTyping} />
            {/* {
                timeUp ? <Sentence typing={typing} sentence={sentence}/> : 
            } */}
            <Sentence typing={typing} sentence={sentence} />
        </div >
    )
}

export default TypeBox