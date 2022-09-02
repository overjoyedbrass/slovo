import React from 'react'
import { Keycell } from './Keycell'
import { Flex, HStack, useBreakpointValue, useColorMode, VStack } from '@chakra-ui/react'

const ROWS = [
    'ľščťžýáíéóďúň',
    'qwertzuiop',
    'asdfghjkl⌫',
    'yxcvbnm↵'
]

export const Keyboard = ({handlefunction, getKeyCellColor}) => {
    const spacing = useBreakpointValue({base: "1px", md: "5px"})
    return (
        <VStack
            w="100%"
            maxW="650px"
            minH="14em"
            direction="column"
            userSelect="none"
            mb={1}            
            spacing={spacing}
        >{
            ROWS.map((row, rowIndex) => 
            <HStack grow={1} key={rowIndex} w="100%" spacing={spacing} h="100%">
                { row.split('').map(l => 
                    <Keycell
                        key={l} 
                        letter={l} 
                        handlefunction={handlefunction} 
                        color={ getKeyCellColor(l) }
                    />
                )}
            </HStack>
            )}
        </VStack>
    )
}