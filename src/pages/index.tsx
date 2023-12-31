import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Inter } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

import { allWords } from '@/data/words';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftRotate, faArrowRightRotate } from '@fortawesome/free-solid-svg-icons';
import CircularWithValueLabel from '@/components/CircularProgess';
const inter = Inter({ subsets: ['latin'] });


export default function Home() {
    const [letterCSS, setLetterCSS] = useState<any[]>([]);
    const [wordCSS, setWordCSS] = useState<string[]>([]);
    const [words, setWords] = useState<string[]>([]);
    const [onFocus, setOnFocus] = useState<boolean>(true);
    const [currentWordIndex, setCurrentWord] = useState<number>(0);
    const [currentLetterIndex, setCurrentLetter] = useState<number>(0);
    const [timeRemaining, setTimeRemaining] = useState(15); // Initialize timer to 15 seconds
    const [timerRunning, setTimerRunning] = useState(false);
    const [wpm, setWPM] = useState<number>(0);
    const [accuracy, setAccuracy] = useState<number>(0);
    const [countCorrectWords, setCountCorrectWords] = useState<number>(0);
    const [countWrongWords, setCountWrongWords] = useState<number>(0);
    const [isEnded, setIsEnded] = useState<boolean>(false);
    const wordsContainerRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [topOfPrevLetter, setTopOfPrevLetter] = useState<number>(0);
    const [randomColor, setRandomColor] = useState<string>('bg-info');
    const getNewWordsAndClearCSS = () => {
        let words = [];
        for (let i = 0; i < 42; i++) {
            words.push(allWords[Math.floor(Math.random() * allWords.length)] + ' ');
        }
        setWords(words);
        let letterCssInit = [] as any[];
        let wordCssInit = [] as string[];

        words.forEach((word, wordIndex) => {
            let blankArray = word.split('').map((letter, letterIndex) => { return "" })
            wordCssInit.push('');
            letterCssInit.push(blankArray);
        });
        setLetterCSS(letterCssInit);
        setWordCSS(wordCssInit);
        wordsContainerRef.current?.focus();
    }

    const newGame = () => {
        // set new words
        getNewWordsAndClearCSS();

        // reset current word and letter
        setCurrentWord(0);
        setCurrentLetter(0);
        // reset timer
        resetTimer();
        setIsEnded(false);
    }

    const getResult = () => {
        const correctWordTotal = wordCSS.filter((word) => word === 'correct').length;
        const wrongWordTotal = wordCSS.filter((word) => word === 'wrong').length;
        const totalWord = correctWordTotal + wrongWordTotal;
        const elapsedTime = 15 - timeRemaining;
        const wpm = Math.floor(correctWordTotal * 60 / (elapsedTime))
        setWPM(wpm)
        setAccuracy(Math.floor(correctWordTotal * 100 / totalWord))
        setCountCorrectWords(correctWordTotal);
        setCountWrongWords(wrongWordTotal);
    }

    const changeLetterCss = (css: string, wordIndex: number, letterIndex: number) => {
        setLetterCSS((prev) => {
            let newLetterCSS = [...prev];
            newLetterCSS[wordIndex][letterIndex] = css;
            return newLetterCSS;
        })
    }

    const changeWordCss = (css: string, wordIndex: number) => {
        setWordCSS((prev) => {
            let newWordCSS = [...prev];
            newWordCSS[wordIndex] = css;
            return newWordCSS;
        })
    }


    // Function to start the timer
    const startTimer = () => {
        setTimerRunning(true);
    }

    // Function to reset the timer
    const resetTimer = () => {
        setTimeRemaining(15);
        setTimerRunning(false);
    }

    const handleKeyPress = (e: KeyboardEvent) => {
        // Ensure the words container is in focus
        if (wordsContainerRef.current === document.activeElement && !isEnded) {
            // is first game
            if (topOfPrevLetter == 0) {
                const curLetter = document.querySelector('.current.letter');
                const curLetterTop = curLetter?.getBoundingClientRect().top;
                if (curLetterTop) {
                    setTopOfPrevLetter(curLetterTop);
                }
            }

            // detect first letter to start countdown
            e.preventDefault();
            const key = e.key;
            const currentWord = words[currentWordIndex];
            const currentLetter = currentWord[currentLetterIndex];
            const wordLength = currentWord.length;
            const isLetter = key.length === 1 && key != ' ';
            const isSpace = key === ' ';
            const isBackspace = key === 'Backspace';
            const isFirstLetter = currentLetterIndex === 0;
            const isTab = key === 'Tab';
            const curLetter = document.querySelector('.current.letter')?.getBoundingClientRect().top;
            const isNewLine = topOfPrevLetter != 0 && topOfPrevLetter != curLetter;

            if (isNewLine) {
                if (curLetter) {
                    setTopOfPrevLetter(curLetter);
                }
            }
            if (isTab) {
                buttonRef.current?.focus();
            }
            else if (isLetter) {
                if (currentLetterIndex === 0 && currentWordIndex === 0) {
                    // start countdown
                    startTimer();
                }
                if (currentLetter === key) {
                    if (currentLetterIndex + 1 < wordLength) {
                        changeLetterCss('correct', currentWordIndex, currentLetterIndex);
                        setCurrentLetter(currentLetterIndex + 1);
                    } else if (currentWordIndex + 1 < words.length) {
                        // If there are more words, move to the next word and reset the letter index
                        setCurrentWord(currentWordIndex + 1);
                        setCurrentLetter(0);
                    }
                } else {
                    // If the letter is incorrect, add the incorrect class to the letter
                    if (currentLetterIndex + 1 < wordLength) {
                        // If there are more words, move to the next word and reset the letter index
                        setCurrentLetter(currentLetterIndex + 1);
                        changeLetterCss('wrong', currentWordIndex, currentLetterIndex);
                    } else {
                        // for wrong letter that exceed the word

                    }
                }
            }

            else if (isSpace) {
                // ยังไม่จบ word แล้วกด space
                if (currentLetter !== key) {
                    // If the current letter is not a space, move to the next word and reset the letter index
                    changeWordCss('wrong', currentWordIndex);
                    setCurrentWord(currentWordIndex + 1);
                    setCurrentLetter(0);
                }
                // จบ word แล้วกด space
                if (currentLetter === key) {
                    if (currentWordIndex + 1 < words.length) {
                        // If there are more words, move to the next word and reset the letter index

                        const isWordIncorrect = letterCSS[currentWordIndex].find((letter: string) => letter === 'wrong');
                        if (isWordIncorrect) {
                            changeWordCss('wrong', currentWordIndex);
                        } else {
                            changeWordCss('correct', currentWordIndex);
                        }
                        setCurrentWord(currentWordIndex + 1);
                        setCurrentLetter(0);
                    }

                }
            }

            else if (isBackspace) {
                // If the current letter is the first letter of the first word, do nothing
                if (currentLetter && isFirstLetter) {
                    if (currentWordIndex == 0) {
                        return
                    }
                    // changeLetterCss('', currentWordIndex, currentLetterIndex);
                    changeWordCss('', currentWordIndex - 1);
                    setCurrentWord(currentWordIndex - 1);
                    setCurrentLetter(words[currentWordIndex - 1].length - 1);
                }
                else if (currentLetter && !isFirstLetter) {
                    changeLetterCss('', currentWordIndex, currentLetterIndex - 1);
                    setCurrentLetter(currentLetterIndex - 1);
                }
            }
        }
    };


    useEffect(() => {
        newGame();
    }, [])

    useEffect(() => {
        if (onFocus) {
            getResult();
            // Add event listeners when onFocus is true
            window.addEventListener('keydown', handleKeyPress);
            // Clean up event listeners when component unmounts
            return () => {
                window.removeEventListener('keydown', handleKeyPress);
            };
        }
    }, [onFocus, currentWordIndex, currentLetterIndex, words]);


    useEffect(() => {
        if (timeRemaining <= 0.00) {
            getRandomColor();
            setIsEnded(true);
            setTimerRunning(false);
        }
        if (timerRunning && timeRemaining > 0.0) {
            const timer = setTimeout(() => {
                setTimeRemaining((prevTime) => prevTime - 0.1);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [timeRemaining, timerRunning]);

    const getRandomColor = () => {
        const color = "bg-info bg-primary bg-accent bg-secondary".split(' ');
        const random = Math.floor(Math.random() * color.length);
        setRandomColor(color[random])
    }

    return (
        <div className='h-screen relative flex flex-col items-center w-full'>
            <div className='container'>
                <Nav />
                <div className='wrap-content'>
                    {/* <div className='time-wpm flex items-center'>
                        <CircularWithValueLabel timeRemaining={timeRemaining} />
                        <p className=''>WPM: {Number.isNaN(wpm) ? 0 : wpm}</p>
                    </div> */}
                    <div ref={wordsContainerRef} tabIndex={0} className='game'>
                        {words.map((word, wordIndex) => {
                            let wordCss = wordIndex === currentWordIndex ? 'word current' : 'word';
                            const currentCssWord = wordCSS[wordIndex];
                            wordCss += " " + currentCssWord
                            return (
                                <div key={wordIndex} className={wordCss}>
                                    {word.split('').map((letter, letterIndex) => {
                                        let css = wordIndex === currentWordIndex && letterIndex === currentLetterIndex ? 'current letter' : 'letter';
                                        const currentCssLetter = letterCSS[wordIndex][letterIndex];
                                        css += " " + currentCssLetter
                                        return (
                                            <span key={letterIndex} className={css}>
                                                {letter}
                                            </span>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                    <div className='flex justify-start w-full'>
                        <div className='flex gap-4 justify-start font-light'>
                            <span className='flex items-center gap-2'>
                                <CircularWithValueLabel timeRemaining={timeRemaining} />
                                <p className='text-md tracking-wider'>Seconds</p>
                            </span>
                            <button onClick={newGame} ref={buttonRef} className='flex justify-center items-center gap-4 py-1 px-2 rounded-md bg-neutral outline-accent outline-1 transition-colors' >
                                <FontAwesomeIcon icon={faArrowRightRotate} className='' />
                                <p className='tracking-wider text-md'>Reset</p>
                            </button>
                            {isEnded &&
                                <div className={`flex items-center text-md tracking-wider gap-4 border border-neutral rounded-md px-2 ${randomColor} text-info-content font-medium`}>
                                    <p className=''>WPM: {Number.isNaN(wpm) ? 0 : wpm}</p>
                                    <p>Wrong words: {countWrongWords}</p>
                                    <p>Correct words: {countCorrectWords}</p>
                                    <p>Accuracy: {accuracy}%</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
