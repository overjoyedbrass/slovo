import { Button, HStack, SimpleGrid, VStack, Tag, FormControl, FormLabel, Switch } from '@chakra-ui/react'
import React from 'react'
import { WordPin } from './WordPin'
import { useGameStore } from '../../app/store'
import { words5 } from '../../utils/words5'
import { words6 } from '../../utils/words6'

const w5s = words5;
w5s.sort();

const w6s = words6;
w6s.sort();

const words = {
    5: w5s,
    6: w6s
}
const wordsOnPage = 56;

export const Helper = () => {
    const wordLength = useGameStore((state) => state.length)
    const [filter1, setFilter1] = React.useState(Array(wordLength).fill('.').join(""))
    const [filter2, setFilter2] = React.useState("")
    const [page, setPage] = React.useState(0)

    const filteredWords = words[wordLength].filter(s => s.match(filter1))
    const lastPage = Math.round(filteredWords.length/wordsOnPage)-1

    React.useEffect(() => {
        setPage(0)
    }, [wordLength])
    function nextPage(){
        setPage(page+1)
    }
    function prevPage(){
        setPage(page-1)
    }
    function resetPage(){
        setPage(0)
    }
    function setLastPage(){
        setPage(lastPage)
    }
    function handleComplete(value){
        setFilter1(value.map(l => l ? l : '.').join(""))
        setPage(0)
    }
    
    var wordsToDisplay = []
    for(let i = page*wordsOnPage; i < (page+1)*wordsOnPage && i < filteredWords.length; i++){
        wordsToDisplay.push(filteredWords[i])
    }

    return (
        <VStack>
            <WordPin handleComplete={handleComplete}/>
            <SimpleGrid
                width="100%"
                minChildWidth='4em'
                maxW="500px"
                overflow="auto" 
                justifyContent="center" 
                alignItems="center"
            >
                {wordsToDisplay.map((w, i) => (
                    <Tag
                        key={i}
                        maxW="fit-content" 
                        display="flex" 
                        m={1} 
                        justifyContent="center"
                    >
                        {w}
                    </Tag>
                ))}
            </SimpleGrid>
            <HStack mt={3}>
                <Button disabled={page === 0} onClick={prevPage}>{"<"}</Button>
                <Button onClick={resetPage}>{page+1}</Button>
                <Button disabled={page === lastPage} onClick={nextPage}>{">"}</Button>                
            </HStack>
            <HStack mt={2}>
                {page !== 0 ? <Button onClick={resetPage}>first</Button> : null}
                {page !== lastPage ? <Button onClick={setLastPage}>last</Button> : null}
            </HStack>
        </VStack>
    )
}