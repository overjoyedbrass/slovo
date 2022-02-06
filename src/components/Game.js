import React from 'react'
import { useSelector } from 'react-redux'
import { Keycell } from './Keycell.js'
import { Tablecell } from './Tablecell.js'
import { Mainbar } from './Mainbar/Mainbar.js'
import { loadCorrect, loadAttempt, loadTable, isLetter, copy2D, loadGameOver, loadWord, removeGameStorage, wordCheck,  letterFrequency} from '../helpers.js'
import './Game.css'

import { themes } from '../theme/themes.js'
import { selectCurrentTheme } from '../theme/themeSlice.js'


function getUsedLetters(array2D, attempt){
    const letters = []
    for(let i = 0; i < attempt; i++){
        for(let j = 0; j < array2D[i].length; j++){
            letters.push(array2D[i][j])
        }
    }
    return letters
}

const ROWS = [
    'QWERTZUIOP',
    'ASDFGHJKL',
    '↵YXCVBNM⌫'
]
const correctLetters = loadCorrect()
var gameOver = loadGameOver()
var fetching = false

export const Game = () => {
    const theme = themes[useSelector(selectCurrentTheme)]

    const attempts = 6
    const wordLength = 5

    const [warnMessage, setWarnMessage] = React.useState("")
    const [attempt, setAttempt] = React.useState(loadAttempt())
    const [gameState, setGameState] = React.useState(loadTable(attempts, wordLength))
    const [targetWord, setTargetWord] = React.useState("")

    React.useEffect(() => {
        loadWord().then(o => {
            const slovo = o[0]
            const newWord = o[1]
            setTargetWord(slovo)
            if(newWord){
                reset()
            }
        })
    }, [])

    React.useEffect(() => {
        document.body.style = `background: ${theme.bgColor} ; color: ${theme.textColor}`;
    }, [theme])

    React.useEffect(() => {
        localStorage.setItem('attempt', attempt)
    }, [attempt])
    React.useEffect(() => {
        localStorage.setItem('table', JSON.stringify(gameState))
    }, [gameState])

    const handlefunction = letter => {
        setWarnMessage("")
        if(gameOver === "1") return
        if(attempt >= attempts) return
        if(fetching) return
        if(letter === '↵' || letter === "Enter"){
            checkAndSubmit()
        }
        else if(letter ==='⌫' || letter === "Backspace"){
            removeLetter()
        }
        else{
            addLetter(letter)
        }
    }
    const handleKeyDown = (event) => handlefunction(event.key)
    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown])

    const checkAndSubmit = async () => {
        if(gameOver === "1"){
            return
        }
        if(gameState[attempt].includes("")){
            setWarnMessage("Slovo musí byť dĺžky 5")
            return
        }
        const slovo = gameState[attempt].join("")
        fetching = true
        const goodWord = await wordCheck(slovo)
        fetching = false
        if(!goodWord){
            setWarnMessage("Slovo nie je v zozname")
            return
        }
        let finish = true;
        for(let i = 0; i < wordLength; i++){
            if(gameState[attempt][i] === targetWord[i]){
                addCorrectLetter(gameState[attempt][i])
            }
            else{
                finish = false;
            }
        }
        if(attempt+1 >= attempts || finish){
            gameOver = "1";
            localStorage.setItem("gameOver", gameOver)
        }
        setAttempt(attempt + 1)

    }

    const addLetter = letter => {
        letter = letter.toLowerCase()
        if(!isLetter(letter)){
            return
        }
        const copy = copy2D(gameState)
        for(let i = 0; i < copy[attempt].length; i++){
            if(copy[attempt][i] === ""){
                copy[attempt][i] = letter
                setGameState(copy)
                return
            }
        }
    }
    const removeLetter = () => {
        const copy = copy2D(gameState)
        for(let i = copy[attempt].length-1; i >= 0; i--){
            if(copy[attempt][i] !== ""){
                copy[attempt][i] = ""
                setGameState(copy)
                return
            }
        }
    }
    const addCorrectLetter = l => {
        correctLetters.push(l)
        localStorage.setItem('correct', JSON.stringify(correctLetters))
    }

    const usedLetters = getUsedLetters(gameState, attempt)

    function reset(){
        correctLetters.length = 0
        gameOver = "0"
        setGameState(Array(attempts).fill(0).map(x => Array(wordLength).fill("")))
        setAttempt(0)
        removeGameStorage()
    }

    const getCellRowColors = index => {
        const colors = Array(wordLength).fill("")
        if(index >= attempt){
            return colors
        }
        const word = gameState[index].join("")
        const freq = letterFrequency(targetWord)

        for(let i = 0; i < wordLength; i++){
            if(targetWord[i] === word[i]){
                colors[i] = theme.rightCell
                freq[word[i]] -= 1
            }
        }

        for(let i = 0; i < wordLength; i++){
            if(colors[i] != "") continue;
            if(targetWord.includes(word[i]) && freq[word[i]] > 0){
                colors[i] = theme.containedCell
                freq[word[i]] -= 1
            }
            else {
                colors[i] = theme.wrongCell
            }
        }

        return colors
    }

    const getKeyCellColor = (l) => {
        l = l.toLowerCase()
        if(!usedLetters.includes(l)){
            return ""
        }
        else if(correctLetters.includes(l)){
            return theme.rightCell
        }
        else if (targetWord.toLowerCase().includes(l)){
            return theme.containedCell
        }
        else{
            return theme.wrongCell
        }
    }
    return (
        <div className="game">
            <Mainbar />
            <div className="answer">
                {gameOver === "0" ? null:
                    <>Hľadané slovo je <a 
                                href={`https://slovnik.aktuality.sk/pravopis/?q=${targetWord}`}
                                target="blank" 
                                style={{color: theme.href, backgroundColor: theme.bgColor}}
                            >{targetWord.toUpperCase()}</a>
                    </>
                }
                <div className="warning">{warnMessage}</div>
            </div>
            {
                !targetWord ? <div className="loading">Načítavam slovo : )</div> :(
                    <div className="playtable">{
                        gameState.map((row, rowIndex) => {
                            const rowColors = getCellRowColors(rowIndex)
                            return (<div key={rowIndex} className={"playtableRow"}>{
                                row.map( (l, colIndex) => 
                                    <Tablecell 
                                        key={colIndex}
                                        letter={l}
                                        color={rowIndex < attempt ? rowColors[colIndex] : ""}
                                    />
                            )}</div>)
                        }
                        )}
                    </div>
                )
            }

            <div className="keyboard">{
                ROWS.map((row, rowIndex) => 
                <div key={rowIndex} className="keyBoardRow">
                    { row.split('').map((l, i) => 
                        <Keycell 
                            key={l} 
                            letter={l} 
                            handlefunction={handlefunction} 
                            color={ getKeyCellColor(l) }
                        />
                    )}
                </div>
                )}
            </div>
            {/* <button onClick={() => reset()}>RESET</button> */}
        </div>
    )
}
