import { faArrowRotateLeft, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState, useEffect, SyntheticEvent } from 'react';

interface SentenceProps {
    typing: string;
    sentence: string;
    totalWordCount: number;
    setTotalWordCount: React.Dispatch<React.SetStateAction<number>>;
    wrongWordCount: number;
    setWrongWordCount: React.Dispatch<React.SetStateAction<number>>;
    setTimeUp: React.Dispatch<React.SetStateAction<boolean>>;
    setSentence: React.Dispatch<React.SetStateAction<string>>
}


function Sentence({ typing, sentence, totalWordCount, setTotalWordCount, wrongWordCount, setWrongWordCount, setTimeUp, setSentence }: SentenceProps) {
    let countChar = 0;
    const [isLoading, setIsLoading] = useState(false);
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
    const refreshSentence = async (e: SyntheticEvent,) => {
        setIsLoading(true)
        const { data } = await axios.get('https://random-word-api.herokuapp.com/word?number=75&length=4')
        setSentence(data.join(' '))
        setIsLoading(false)
    }


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
        <div className='flex-col flex justify-center gap-10'>
            <div
                className={isLoading ? "sentence-wrap-loading" : "sentence-wrap"}
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
            </div>
            <button onClick={(e) => { refreshSentence(e) }} disabled={isLoading}><FontAwesomeIcon icon={faArrowRotateRight} className={isLoading ? 'text-2xl animate-spin text-gray-500 ' : 'text-2xl text-gray-500 hover:text-black'} /></button>
        </div>
    );
}

export default Sentence;
