import React from 'react'
import { useSelector } from 'react-redux'
import { Mainbar } from './Mainbar/Mainbar.js'
import { Spinner } from './Spinner/Spinner.js'
import { loadCorrect, loadAttempt, loadTable, isLetter, copy2D, loadGameOver, loadWord, removeGameStorage, wordCheck,  letterFrequency, saveToStorage, loadWordLength} from '../helpers.js'
import './Game.css'

import { themes } from '../theme/themes.js'
import { selectCurrentTheme } from '../theme/themeSlice.js'
import { Playtable } from './Playtable/Playtable.js'
import { Keyboard } from './Keyboard/Keyboard.js'
import { InfoBox } from './InfoBox.js'

function getUsedLetters(array2D, attempt){
    const letters = []
    for(let i = 0; i < attempt; i++){
        for(let j = 0; j < array2D[i].length; j++){
            letters.push(array2D[i][j])
        }
    }
    return letters
}

export const Game = ({setroute}) => {
    const theme = themes[useSelector(selectCurrentTheme)]
    const attempts = 6
    const wordLength = loadWordLength()
    
    const correctLetters = loadCorrect(wordLength)
    var gameOver = loadGameOver(wordLength)

    const [fetching, setFecthing] = React.useState(false)
    const [warnMessage, setWarnMessage] = React.useState("")
    const [table, setTable] = React.useState(loadTable(attempts, wordLength))
    const [attempt, setAttempt] = React.useState(loadAttempt(wordLength))
    const [targetWord, setTargetWord] = React.useState("")

    React.useEffect(() => {
        loadWord().then(o => {
            const slovo = o[0]
            const newWord = o[1]
            setTargetWord(slovo)
            if(newWord){
                resetGame()
            }
        })
    }, [])

    React.useEffect(() => {
        document.body.style = `background: ${theme.bgColor} ; color: ${theme.textColor}`;
    }, [theme])

    React.useEffect(() => {
        saveToStorage("attempt", wordLength, attempt)
        saveToStorage("table", wordLength, JSON.stringify(table))
    }, [attempt])

    React.useEffect(() => {
        saveToStorage("table", wordLength, JSON.stringify(table))
    }, [table])

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
        if(table[attempt].includes("")){
            setWarnMessage("Slovo musí byť dĺžky 5")
            return
        }
        const slovo = table[attempt].join("")

        setFecthing(true)
        const goodWord = await wordCheck(slovo)
        setFecthing(false)
        if(!goodWord){
            setWarnMessage("Slovo nie je v zozname")
            return
        }
        let finish = true;
        for(let i = 0; i < wordLength; i++){
            if(table[attempt][i] === targetWord[i]){
                addCorrectLetter(table[attempt][i])
            }
            else{
                finish = false;
            }
        }
        if(attempt+1 >= attempts || finish){
            gameOver = "1";
            saveToStorage("gameOver", wordLength, gameOver)
        }
        setAttempt(attempt + 1)
    }

    const addLetter = letter => {
        letter = letter.toLowerCase()
        if(!isLetter(letter)){
            return
        }
        const copy = copy2D(table)
        for(let i = 0; i < copy[attempt].length; i++){
            if(copy[attempt][i] === ""){
                copy[attempt][i] = letter
                setTable(copy)
                return
            }
        }
    }
    const removeLetter = () => {
        const copy = copy2D(table)
        for(let i = copy[attempt].length-1; i >= 0; i--){
            if(copy[attempt][i] !== ""){
                copy[attempt][i] = ""
                setTable(copy)
                return
            }
        }
    }
    const addCorrectLetter = l => {
        correctLetters.push(l)
        saveToStorage("correct", wordLength, JSON.stringify(correctLetters))
    }

    const usedLetters = getUsedLetters(table, attempt)

    const getCellRowColors = index => {
        const colors = Array(wordLength).fill("")
        if(index >= attempt){
            return colors
        }
        const word = table[index].join("")
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

    const resetGame = () => {
        correctLetters.length = 0
        gameOver = "0"
        removeGameStorage(wordLength)
        setTable(Array(attempts).fill(Array(wordLength).fill("")))
        setAttempt(0)
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
            <Mainbar setroute={setroute}/>

            {
                !targetWord ? 
                (
                    <>
                    <div className="loadingMessage">Načítavam slovo : )</div>
                    <Spinner theme={theme}/>
                    </>
                )
                 :
                (
                    <>
                    <InfoBox theme={theme} targetWord={targetWord}/>
                    {
                        fetching ? <div className="warning">Zisťujem . . .</div> : 
                        <div className="warning">{warnMessage}</div>
                    }

                    <Playtable gameState={table} theme={theme} colorFunction={getCellRowColors}/>
                    <Keyboard handlefunction={handleKeyDown} getKeyCellColor={getKeyCellColor}/>    
                    </>
                )
            }
            {/* <button onClick={() => resetGame()}>RESET</button> */}
            <font style={{fontSize: '0.5em', position: 'absolute', bottom: "0px", left: "0px", color: theme.textColor}}>Last version 6:23</font>
        </div>
    )
}
