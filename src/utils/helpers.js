import { words5 } from './words5.js'
import { words6 } from './words6.js'
const diakritika = 'ľščťžýáíéóďúň'

export function isWordCorrect(slovo) {
    return words5.includes(slovo) || words6.includes(slovo)
}

export function letterToAccent(l){
    const letterMap = {
        'l': 'ľ', 's': 'š', 'c': 'č', 't': 'ť', 'z': "ž",
        'y': 'ý', 'a': 'á', 'i': 'í', 'e': 'é', 'o': 'ó', 
        'd': 'ď', 'n': 'ň', 'u': 'ú'
    }
    const output = letterMap[l]
    return output ? output : l.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

export function copy2D(array2d){
    var newArray = []
    for (let i = 0; i < array2d.length; i++){
        newArray[i] = array2d[i].slice()
    }
    return newArray
}

export function isLetter(str) {
    return str.length === 1 && (str.match(/[a-z]/i) || diakritika.includes(str));
}

export const loadTable = (rows, cols) => {
    const table = localStorage.getItem(`table${cols}`)
    try{
        return table ? JSON.parse(table) : Array(rows).fill(Array(cols).fill(""))
    }
    catch(err){
        return Array(rows).fill(Array(cols).fill(""))
    }
}

export const loadAttempt = (length) => {
    const number = localStorage.getItem(`attempt${length}`)
    return number ? parseInt(number) : 0
}

export const loadCorrect = length => {
    const correct = localStorage.getItem(`correct${length}`)
    try {
        return correct ? JSON.parse(correct) : []
    }
    catch(err){
        return []
    }
}

export const loadWordLength = () => {
    var length = localStorage.getItem(`wordLength`)
    if(!length || isNaN(parseInt(length))){
        length = 5
        localStorage.wordLength = length
    }
    else {
        length = parseInt(length)
    }
    return length
}

export function letterFrequency(word){
    const freq = {}
    for(let i = 0; i < word.length; i++){
        if(freq[word[i]] == null){
            freq[word[i]] = 1
        }
        else{
            freq[word[i]] += 1
        }
    }
    return freq
}

export function saveToStorage(keyWord, wordLength, data){
    localStorage.setItem(`${keyWord}${wordLength}`, JSON.stringify(data))
}

export const removeGameStorage = length => {
    localStorage.setItem(`attempt${length}`, 0)
    localStorage.setItem(`table${length}`, "")
}

export function isWinner(table, attempt, targetWord){
    if(attempt === 0) return false
    const input = table[attempt-1].join("")
    for(let i = 0; i < input.length; i++){
        if(input[i] !== targetWord[i]){
            return false
        }
    }
    return true
}

export function getLetters(table, attempt, targetWord){
    const usedLetters = new Set()
    const correctLetters = []
    for(let i = 0; i < attempt; i++){
        for(let j = 0; j < table[i].length; j++){
            if(table[i][j] === targetWord[j]){
                correctLetters.push(table[i][j])
            }
            usedLetters.add(table[i][j])
            usedLetters.add(letterToAccent(table[i][j]))
        }
    }
    return [correctLetters, usedLetters]
}
