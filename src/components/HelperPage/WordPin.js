import { Button, HStack, Input, PinInput } from '@chakra-ui/react'
import React from 'react'
import { useGameStore } from '../../app/store'

export const WordPin = ({ handleComplete }) => {
    const wordLength = useGameStore((state) => state.length)
    const [input, setInput] = React.useState(Array(wordLength).fill(""))

    const handleChange = ({ target }) => {
        const copy = input.slice()
        const index = parseInt(target.id)
        copy[index] = target.value[target.value.length-1]?.trim().toLowerCase()
        if(!isNaN(copy[index])){
            copy[index] = ""
        }
        setInput(copy)
    }
    function clear(){
        const clearArr = Array(wordLength).fill("")
        setInput(clearArr)
        handleComplete(clearArr)
    }
    React.useEffect(() => {
        clear()
    }, [wordLength])

    return (
        <HStack
            m="1em 0"
            maxW="650px"
        >
            {input.map((l, i) => ((
            <Input
                textAlign="center"
                value={l}
                id={i}
                maxLength={2}
                onChange={handleChange}
                className="chakra-pin-input"
                w="3em"
                h="3em"
            />)))}
            <Button onClick={() => handleComplete(input)}>
                Filter
            </Button>
            { input.join("") ? 
            <Button onClick={clear}>Clear</Button> : null }
        </HStack>
    )
}