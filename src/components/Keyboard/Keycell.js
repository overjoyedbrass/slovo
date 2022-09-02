import React from 'react'
import { Flex } from '@chakra-ui/react'
export const Keycell = ({ letter, handlefunction, color }) => {

    let sx = { 
        backgroundColor: color,
        borderColor: color ? color : "gray"
    }
    if(letter === '↵' || letter === '⌫'){
        sx.padding = "0 1em 0 1em"
    }
    return (
        <Flex
            sx={{position: "relative", ...sx}}
            m="0.2em"
            rounded="lg"
            position={"relative"}
            justifyContent="center"
            align="center"
            grow={1}
            textTransform="uppercase"
            border="1px solid"
            onClick={() => handlefunction(letter)}
        >
            { letter }
        </Flex>
    )
}