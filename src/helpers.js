const BASE_URL = ""
const AUTHORIZATION_KEY = ""

async function customFetch(url){
    return await fetch(url, {
        headers: {
            authorization: AUTHORIZATION_KEY
        }
    })
}

export function copy2D(array2d){
    var newArray = []
    for (let i = 0; i < array2d.length; i++){
        newArray[i] = array2d[i].slice()
    }
    return newArray
}
export function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

export const loadTable = (rows, cols) => {
    const table = localStorage.getItem(`table${cols}`)
    try{
        return table ? JSON.parse(table) : Array(rows).fill(0).map(x => Array(cols).fill(""))
    }
    catch(err){
        return Array(rows).fill(0).map(x => Array(cols).fill(""))
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

export const loadGameOver = (length) => {
    const gameOver = localStorage.getItem(`gameOver${length}`)
    return gameOver ? gameOver : "0"
}

export const loadWord = async (length) => {

    const url = `${BASE_URL}/word?length=${length}`
    const response = await customFetch(url)
    var slovo = await response.text()
    slovo = slovo.toLocaleLowerCase()
    

    const lastWord = localStorage.getItem(`lastWord${length}`)
    let reset = false
    if(slovo !== lastWord){
        reset = true
    }
    localStorage.setItem(`lastWord${length}`, slovo)
    return [slovo, reset]
}

export async function wordCheck(slovo) {
    const url = `${BASE_URL}/check?word=${slovo.toLowerCase()}`
    const response = await customFetch(url)
    const text = await response.text()
    return text === "True"
}

//dont want to do localStorage.clear(), maybe i will wantt to keep some data in future
export const removeGameStorage = length => {
    localStorage.setItem(`correct${length}`, "")
    localStorage.setItem(`gameOver${length}`, "")
    localStorage.setItem(`attempt${length}`, "")
    localStorage.setItem(`table${length}`, "")
}

export const suggestWord = async slovo => {
    const url = `${BASE_URL}/suggest?word=${slovo.toLowerCase()}`
    await customFetch(url)
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
    localStorage.setItem(`${keyWord}${wordLength}`, data)
}