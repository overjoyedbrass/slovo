import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Mainbar } from './Mainbar/Mainbar.js'
import { Spinner } from './Spinner/Spinner.js'
import { loadCorrect, loadAttempt, loadTable, isLetter, copy2D, loadGameOver, loadWord, removeGameStorage, wordCheck,  letterFrequency, saveToStorage, loadWordLength} from '../helpers.js'
import './Game.css'
import { format, endOfDay } from 'date-fns'

import { themes } from '../theme/themes.js'
import { selectCurrentTheme } from '../theme/themeSlice.js'
import { Playtable } from './Playtable/Playtable.js'
import { Keyboard } from './Keyboard/Keyboard.js'
import { InfoBox } from './InfoBox.js'

import { saveGameState, updateLeaderboard, selectCurrentLength, selectTargetWord } from '../slices/gameState.js'

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
    const wordLength = useSelector(selectCurrentLength)
    const targetWord = useSelector(selectTargetWord)
    const correctLetters = loadCorrect(wordLength)
    const nickname = localStorage.nickname ?? "12345"

    var gameOver = loadGameOver(wordLength)

    const [fetching, setFecthing] = React.useState(false)
    const [warnMessage, setWarnMessage] = React.useState("")
    const [table, setTable] = React.useState(loadTable(attempts, wordLength))
    const [attempt, setAttempt] = React.useState(loadAttempt(wordLength))
    const dispatch = useDispatch()

    React.useEffect(() => {
        if(targetWord !== "") return
        loadWord(wordLength).then(o => {
            const [slovo, newWord, leaderboard, history] = o

            if(newWord){
                resetGame()
            }
            
            dispatch(saveGameState({
                word: slovo,
                leaderboard: leaderboard,
                history: history
            }))
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
        const goodWord = await wordCheck(slovo, nickname)
        setFecthing(false)
        if(!goodWord){
            setWarnMessage("Slovo nie je v zozname")
            return
        }
        let winner = true;
        for(let i = 0; i < wordLength; i++){
            if(table[attempt][i] === targetWord[i]){
                addCorrectLetter(table[attempt][i])
            }
            else{
                winner = false;
            }
        }
        if(winner && nickname){
            dispatch(updateLeaderboard([nickname, format(new Date(), "hh:mm")]))
        }
        if(attempt+1 >= attempts || winner){
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
                        gameOver == "1" ? <Timer /> :
                        (fetching ? <div className="warning">Zisťujem . . .</div> : 
                        <div className="warning">{warnMessage}</div>)
                    }

                    <Playtable gameState={table} theme={theme} colorFunction={getCellRowColors}/>
                    <Keyboard handlefunction={handlefunction} getKeyCellColor={getKeyCellColor}/>
                    </>
                )
            }
            {/* <button onClick={() => resetGame()}>RESET</button> */}
        </div>
    )
}

const Timer = () => {
    const [time, setTime] = React.useState(new Date())
    React.useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(interval)
    })
    return (
        <div className="warning">Nové slovo: {format(endOfDay(time)-time, "HH:mm:ss")}</div>
    )
}
