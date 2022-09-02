import React from 'react'
import { Keycell } from './Keycell'


import { themes } from '../../theme/themes'
import { useSelector } from 'react-redux'
import { selectCurrentTheme } from '../../theme/themeSlice'

import { Flex } from '@chakra-ui/react'

const ROWS = [
    'ľščťžýáíéóďúň',
    'qwertzuiop',
    'asdfghjkl',
    '↵yxcvbnm⌫'
]

export const Keyboard = ({handlefunction, getKeyCellColor}) => {
    const theme = themes[useSelector(selectCurrentTheme)]

    return (
        <Flex
            w="100%"
            maxW="650px"
            minH="10em"
            direction="column"
            userSelect="none"
        >{
            ROWS.map((row, rowIndex) => 
            <Flex grow={1} key={rowIndex}>
                { row.split('').map(l => 
                    <Keycell
                        key={l} 
                        letter={l} 
                        handlefunction={handlefunction} 
                        color={ getKeyCellColor(l) }
                        theme={theme}
                    />
                )}
            </Flex>
            )}
        </Flex>
    )
}