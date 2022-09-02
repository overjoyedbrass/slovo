import { words5 } from "../helpers/words5";
import { words6 } from "../helpers/words6";

const gameBeginning = new Date('2 September 2022').setHours(0, 0, 0, 0);

const dateIndex = (beginning, date) =>
    Math.round((date.setHours(0, 0, 0, 0) - beginning) / 864e5)

const words = {
    5: words5,
    6: words6,
}

export const wordleForDate = (date, length) => {
    if(![5,6].includes(length)){
        length = 5
    }
    return words[length][dateIndex(gameBeginning, date) % words[length].length];
}