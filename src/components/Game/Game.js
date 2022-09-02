import React from 'react'
import { useGameStore } from '../../app/store.js'
import { Mainbar } from '../Mainbar/Mainbar.js'
import { loadAttempt, isWinner, getLetters, loadTable, isLetter, copy2D, removeGameStorage, isWordCorrect,  letterFrequency, saveToStorage,  letterToAccent } from '../../utils/helpers.js'
import { wordleForDate } from '../../utils/indexing.js'
import { appColors as allAppColors } from '../../theme/theme.js'
import { Playtable } from '../Playtable/Playtable.js'
import { Keyboard } from '../Keyboard/Keyboard.js'
import { InfoBox } from './InfoBox.js'
import { toast } from 'react-toastify'
import { Flex, useColorMode, VStack } from '@chakra-ui/react'
import { Timer } from './Timer.js'

export const Game = () => {
    const { colorMode } = useColorMode()
    const appColors = allAppColors[colorMode]
    const attempts = 6

    const wordLength = useGameStore((state) => state.length)
    const targetWord = wordleForDate(new Date(), wordLength)

    const [gameState, setGameState] = React.useState({
        table: loadTable(attempts, wordLength),
        attempt: loadAttempt(wordLength)
    })

    const winner = isWinner(gameState.table, gameState.attempt, targetWord)    
    const [correctLetters, usedLetters] = getLetters(gameState.table, gameState.attempt, targetWord)
    
    const strtable = []
    const multiples = []

    React.useEffect(() => {
        const lastWord = localStorage.getItem(`lastWord${wordLength}`)
        if(lastWord !== targetWord){
            localStorage.setItem(`lastWord${wordLength}`, targetWord)
            saveToStorage("lastload", wordLength, (new Date()).getTime())
            resetGame()
        }
    })

    React.useEffect(() => {
        setGameState({
            table: loadTable(attempts, wordLength),
            attempt: loadAttempt(wordLength)
        })
    }, [wordLength])

    React.useEffect(() => {
        saveToStorage("attempt", wordLength, gameState.attempt)
        saveToStorage("table", wordLength, gameState.table)
    }, [gameState])

    React.useEffect(() => {
        const handleKeyDown = (event) => handlefunction(event.key)
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    })

    const handlefunction = letter => {
        if(winner) return
        if(gameState.attempt >= attempts) return
        if(letter === '↵' || letter === "Enter") checkAndSubmit()
        else if(letter ==='⌫' || letter === "Backspace") removeLetter()
        else addLetter(letter)
    }

    const checkAndSubmit = async () => {
        if(winner) return
        if(gameState.table[gameState.attempt].includes("")){
            toast.warn(`Slovo musí byť dĺžky ${wordLength}`, {toastId: 101})
            return
        }
        const slovo = gameState.table[gameState.attempt].join("")
        const goodWord = isWordCorrect(slovo)
        
        if(!goodWord){
            const copy = copy2D(gameState.table)
            copy[gameState.attempt] = Array(wordLength).fill("")
            setGameState({...gameState, table: copy})
            toast.warn("Slovo nie je v zozname", {toastId: 101})
            return
        }
        let guessed = slovo === targetWord;
        if(guessed){
            toast.success("Gratulujem!", {toastId: 1, autoClose: 5000})
        }
        
        setGameState({...gameState, attempt: gameState.attempt + 1})
        if(gameState.attempt+1 >= attempts){
            toast.info("Vyčerpali ste pokusy :(", {toastId: 1, autoClose: 3000})
        }
    }

    const addLetter = letter => {
        letter = letter.toLowerCase()
        if(!isLetter(letter)){
            return
        }
        const copy = copy2D(gameState.table)
        for(let i = 0; i < copy[gameState.attempt].length; i++){
            if(copy[gameState.attempt][i] === ""){
                copy[gameState.attempt][i] = letter
                setGameState({attempt: gameState.attempt, table: copy})
                return
            }
        }
    }

    const removeLetter = () => {
        const copy = copy2D(gameState.table)
        for(let i = copy[gameState.attempt].length-1; i >= 0; i--){
            if(copy[gameState.attempt][i] !== ""){
                copy[gameState.attempt][i] = ""
                setGameState({attempt: gameState.attempt, table: copy})
                return
            }
        }
    }

    const resetGame = () => {        
        removeGameStorage(wordLength)
        setGameState({attempt: 0, table: Array(attempts).fill(Array(wordLength).fill(""))})

    }

    const getRowCellColors = index => {
        const colors = Array(wordLength).fill("")

        if(index >= gameState.attempt){
            return colors
        }

        let copyRow = Array(wordLength).fill("")
        const inputWord = gameState.table[index].join("")
        const freq = letterFrequency(targetWord)

        for(let i = 0; i < wordLength; i++){
            if(targetWord[i] === inputWord[i]){
                colors[i] = appColors.rightCell
                copyRow[i] = "🟩"
                freq[inputWord[i]] -= 1
            }
        }
        for(let i = 0; i < wordLength; i++){
            if(colors[i] !== "") continue;
            if(targetWord.includes(inputWord[i]) && freq[inputWord[i]] > 0){
                colors[i] = appColors.containedCell
                copyRow[i] = "🟨"
                freq[inputWord[i]] -= 1
            }
            else {
                colors[i] = appColors.wrongCell
                copyRow[i] = "⬛"
            }
        }
        for(let i = 0; i < wordLength; i++){
            let letter = inputWord[i]
            if(targetWord.includes(letter) && freq[letter] > 0){
                freq[letter] -= 1
                multiples.push(`${index}.${i}`)
            }
        }
        strtable[index] = copyRow.join('')
        return colors
    }

    const getKeyCellColor = (l) => {
        l = l.toLowerCase()
        if(!usedLetters.has(l)){
            return ""
        }
        else if(correctLetters.includes(l)){ 
            return appColors.rightCell
        }
        else if (targetWord.toLowerCase().includes(l)){
            return appColors.containedCell
        }
        else{
            return appColors.wrongCell
        }
    }
    
    const rowColors = []
    if(targetWord){
        for(let i = 0; i < attempts; i++){
            rowColors.push(getRowCellColors(i))
        }
    }

    return (
        <Flex
            direction="column"
            justify="space-between"
            align="center"
            w="100%"
            sx={{height: "calc(var(--vh, 1vh)*100);"}}
        >
            <VStack w="100%" spacing={2}>
                <Mainbar share={targetWord && winner} strtable={strtable}/>
                {
                    winner || gameState.attempt >= attempts ? 
                    <>
                        <InfoBox targetWord={targetWord}/>
                        <Timer />
                    </> : null
                }
            </VStack>
               
            <Playtable 
                gameState={gameState.table} 
                colors={rowColors} 
                multiples={multiples}
                ratio={`${wordLength/attempts}`}
            />
            <Keyboard 
                handlefunction={handlefunction} 
                getKeyCellColor={getKeyCellColor}
            />

            {/* <button onClick={() => resetGame()}>RESET</button> */}
        </Flex>
    )
}