import React from 'react'

function TypeBox({ typing }: { typing: string }) {
    const sentence = "run jump swim fly drive sail i you have has"
    const chars = sentence.split('')
    const words = sentence.split(' ')

    const cssForChar = (index: number) => {
        let css = ""
        if (index == typing.length) {
            css += 'char-active '
        }
        if (index >= typing.length) {
            css += 'char-nontyped'
        }
        return css
    }

    return (
        <div className='h-full flex flex-col p-40 items-center gap-40'>
            <div>
                <h1>TYPING: {typing}</h1>
                <h1>COUNT : {typing.length}</h1>
            </div>
            <div className='flex flex-wrap flex-row text-2xl font-semibold text-neutral tracking-widest ease-in'>
                {chars.map((char, index) => {
                    if (char == " ") {
                        return <span key={index} className={cssForChar(index)}>&nbsp;</span>
                    }
                    return <span key={index} className={cssForChar(index)}>{char}</span>
                })}
            </div>
        </div >
    )
}

export default TypeBox

