import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Inter } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { allWords } from '@/data/words';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftRotate, faArrowRightRotate } from '@fortawesome/free-solid-svg-icons';
const inter = Inter({ subsets: ['latin'] });


export default function Home() {
    const [letterCSS, setLetterCSS] = useState<any[]>([]);
    const [wordCSS, setWordCSS] = useState<string[]>([]);
    const [words, setWords] = useState<string[]>([]);
    const [onFocus, setOnFocus] = useState<boolean>(true);
    const [currentWordIndex, setCurrentWord] = useState<number>(0);
    const [currentLetterIndex, setCurrentLetter] = useState<number>(0);
    const [countCorrectWord, setCountCorrectWord] = useState<number>(0);
    const [countWrongWord, setCountWrongWord] = useState<number>(0);
    const [timeRemaining, setTimeRemaining] = useState(15); // Initialize timer to 15 seconds
    const [timerRunning, setTimerRunning] = useState(false);
    const [wpm, setWPM] = useState<number>(0);
    const wordsContainerRef = useRef<HTMLDivElement | null>(null);

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
    }




    const newGame = () => {
        // set new words
        getNewWordsAndClearCSS();

        // reset current word and letter
        setCurrentWord(0);
        setCurrentLetter(0);

        // reset timer
        resetTimer();
    }

    const getWPM = () => {
        const correctWordTotal = wordCSS.filter((word) => word === 'correct').length;
        const wrongWordTotal = wordCSS.filter((word) => word === 'wrong').length;
        const totalWord = correctWordTotal + wrongWordTotal;
        const elapsedTime = 15 - timeRemaining;
        const wpm = Math.floor(correctWordTotal * 60 / (elapsedTime))
        return wpm;
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
        if (wordsContainerRef.current === document.activeElement) {

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
            // const currentLetterRef = document.querySelector('.letter.current');

            if (isLetter) {
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
            setWPM(getWPM());
            // Add event listeners when onFocus is true
            window.addEventListener('keydown', handleKeyPress);
            // Clean up event listeners when component unmounts
            return () => {
                window.removeEventListener('keydown', handleKeyPress);
            };
        }
    }, [onFocus, currentWordIndex, currentLetterIndex, words]);


    useEffect(() => {
        if (timeRemaining === 0) {
            setTimerRunning(false);
        }
        if (timerRunning && timeRemaining > 0) {
            const timer = setTimeout(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [timeRemaining, timerRunning]);
    return (
        <div className='h-screen relative flex flex-col items-center w-full'>
            <div className='container h-full'>
                <Nav />
                <div className='flex justify-center items-center h-full flex-col gap-10'>
                    <div className='flex justify-start w-full gap-10 text-2xl font-medium text-accent'>
                        <p className=''>{timeRemaining}</p>
                        <p className=''>WPM: {wpm}</p>
                    </div>
                    <div ref={wordsContainerRef} tabIndex={0} className='outline-none'>
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
                    <button onClick={newGame}><FontAwesomeIcon icon={faArrowRightRotate} className='text-2xl text-gray-500 hover:text-black' /></button>
                </div>
            </div>
            <Footer />
        </div>
    )
}
