import React, { useState, useEffect } from 'react';

interface SentenceProps {
    typing: string;
    sentence: string;
    totalWordCount: number;
    setTotalWordCount: React.Dispatch<React.SetStateAction<number>>;
    wrongWordCount: number;
    setWrongWordCount: React.Dispatch<React.SetStateAction<number>>;
}
function Sentence({ typing, sentence, totalWordCount, setTotalWordCount, wrongWordCount, setWrongWordCount }: SentenceProps) {
    let countChar = 0;

    const words = sentence.split(' ').map((word, index) => {
        let chars = Array.from(word).map((char, charIndex) => ({
            char,
            index: countChar++,
        }));
        chars.push({ char: ' ', index: countChar++ });
        return {
            word: word + ' ',
            chars,
        };
    });

    const cssForChar = (index: number) => {
        let css = '';
        if (index == typing.length) {
            css += 'char-active ';
        }
        if (index >= typing.length) {
            css += 'char-nontyped ';
        }
        if (sentence[index] != typing[index]) {
            css += 'underline text-red-500 ';
        }
        css += 'relative';
        return css;
    };


    useEffect(() => {
        const typedWords = typing.split(' ').filter((word) => word.trim() !== '');
        const correctWords = sentence.split(' ').filter((word, index) => {
            if (index == typedWords.length - 1) {
                if (word.trim() === typedWords[index].trim()) {
                    return typedWords[index]
                }
            }
            return (
                typedWords[index] && word.trim() === typedWords[index].trim()
            );
        });
        setTotalWordCount(typedWords.length);
        setWrongWordCount(typedWords.length - correctWords.length);
    }, [typing, sentence]);

    return (
        <div
            className='flex flex-wrap justify-between flex-row text-2xl font-semibold text-neutral tracking-widest ease-in'
            style={{ wordWrap: 'break-word' }}
        >
            {words.map((word, index) => {
                return (
                    <div key={index} className='flex flex-row'>
                        {word.chars.map((char, childIndex) => {
                            return (
                                <span key={childIndex} className={cssForChar(char.index)}>
                                    {char.char === ' ' ? '\u00A0' : char.char}
                                </span>
                            );
                        })}
                    </div>
                );
            })}
            {/* <div>
                <p>Total Words Typed: {totalWordCount}</p>
                <p>Wrong Words: {wrongWordCount}</p>
            </div> */}
        </div>
    );
}

export default Sentence;
