import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
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
            rounded="lg"
            position={"relative"}
            justifyContent="center"
            align="center"
            grow={1}
            border="1px solid"
            cursor={"pointer"}
            onClick={() => handlefunction(letter)}
            height="100%"
        >
            <Text as='b'>{ letter }</Text>
        </Flex>
    )
}