const BASE_URL = ""
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
    const table = localStorage.getItem('table')
    try{
        return table ? JSON.parse(table) : Array(rows).fill(0).map(x => Array(cols).fill(""))
    }
    catch(err){
        return Array(rows).fill(0).map(x => Array(cols).fill(""))
    }
}
export const loadAttempt = () => {
    const number = localStorage.getItem('attempt')
    return number ? parseInt(number) : 0
}
export const loadCorrect = () => {
    const correct = localStorage.getItem("correct")
    try {
        return correct ? JSON.parse(correct) : []
    }
    catch(err){
        return []
    }
}

export const loadGameOver = () => {
    const gameOver = localStorage.getItem("gameOver")
    return gameOver ? gameOver : "0"
}

export const loadWord = async () => {
    const url = `${BASE_URL}/word`
    const response = await fetch(url)
    const slovo = await response.text()

    const lastWord = localStorage.getItem("lastWord", slovo)
    let reset = false
    if(slovo !== lastWord){
        reset = true
    }
    localStorage.setItem("lastWord", slovo)
    return [slovo.toLowerCase(), reset]
}

export async function wordCheck(slovo) {
    const url = `${BASE_URL}/check?word=${slovo.toLowerCase()}`
    const response = await fetch(url)
    const text = await response.text()
    return text === "True"
}

//dont want to do localStorage.clear(), maybe i will wantt to keep some data in future
export const removeGameStorage = () => {
    localStorage.setItem("correct", "")
    localStorage.setItem("gameOver", "")
    localStorage.setItem("attempt", "")
    localStorage.setItem("table", "")
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