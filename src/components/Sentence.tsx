import React from 'react'

function Sentence({ typing, sentence }: { typing: string, sentence: string }) {

    let countChar = 0;
    let allWordCount = 0;
    let wrongWordCount = 0;

    const words = sentence.split(" ").map((word, index) => {
        let chars = Array.from(word).map((char, charIndex) => ({
            char,
            index: countChar++
        }));
        chars.push({ char: " ", index: countChar++ })
        return {
            word: word + " ",
            chars
        };
    });

    const cssForChar = (index: number) => {
        let css = ""
        if (index == typing.length) {
            css += 'char-active '
        }
        if (index >= typing.length) {
            css += 'char-nontyped '
        }
        if (sentence[index] != typing[index]) {
            css += 'underline text-red-500 '
        }
        css += "relative"
        return css
    }
    return (
        <div className='flex flex-wrap justify-between flex-row text-2xl font-semibold text-neutral tracking-widest ease-in' style={{ wordWrap: 'break-word' }}>
            {
                words.map((word, index) => {
                    return (
                        <div key={index} className='flex flex-row'>
                            {word.chars.map((char, childIndex) => {
                                return (
                                    <span key={childIndex} className={cssForChar(char.index)}>
                                        {char.char === ' ' ? '\u00A0' : char.char}
                                    </span>)
                            })}
                        </div>)
                })
            }
        </div>
    )
}

export default Sentence