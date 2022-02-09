const BASE_URL = ""
const AUTHORIZATION_KEY = ""

const DIKARITIKA = "ľščťžýáíéď"

async function customFetch(url, method="GET", data=null){
    const object = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            authorization: AUTHORIZATION_KEY,
        },
    }
    if(method==="POST"){
        object['body'] = JSON.stringify(data)
    }
    return await fetch(url, object)
}

function hashCode(s){
    return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
}

export function copy2D(array2d){
    var newArray = []
    for (let i = 0; i < array2d.length; i++){
        newArray[i] = array2d[i].slice()
    }
    return newArray
}
export function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i) || DIKARITIKA.includes(str);
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
    var data = await response.text()
    try{
        data = JSON.parse(data)
    }
    catch(err){
        return null
    }

    const slovo = data.word
    const leaderboardData = data.leaderboard
    const history = data.history

    const leaderboard = []
    // "nick" : [time, attempt]
    for (const [key, value] of Object.entries(leaderboardData)) {
        leaderboard.push([key, value[0], value[1]])
    }
    leaderboard.sort((a, b) => a[1]-b[1])

    const lastWord = localStorage.getItem(`lastWord${length}`)
    let reset = false
    if(hashCode(slovo) !== parseInt(lastWord)){
        reset = true
    }
    localStorage.setItem(`lastWord${length}`, hashCode(slovo))
    return [slovo, reset, leaderboard, history]
}

export async function wordCheck(slovo) {
    const url = `${BASE_URL}/check?word=${slovo.toLowerCase()}`
    const response = await customFetch(url)
    const text = await response.text()
    return text === "True"
}

export async function lbwrite(data) {
    const url = `${BASE_URL}/lbwrite`
    const response = await customFetch(url, "POST", data)
    return response
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