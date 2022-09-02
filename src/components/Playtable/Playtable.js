import React from 'react'
import { Tablecell } from './Tablecell.js'
import { useGameStore } from '../../app/store.js'

import { Flex } from '@chakra-ui/react'

export const Playtable = ({ gameState, colors, multiples }) => {
    const wordLength = useGameStore(state => state.length)
    return (
        <Flex
            maxW="600px"
            w="100%"
            columns={wordLength}
            m="2em 0"
            p="0 2em"
            grow={1}
            userSelect={"none"}
            spacing={0}
            direction="column"
        >
            {
            gameState.map((row, rowIndex) => {
                const rowColors = colors[rowIndex]
                return (
                    <Flex
                        key={rowIndex}
                        grow={1}
                        flexBasis={0}
                    >
                        { row.map((letter, colIndex) => {
                            return (
                                <Tablecell
                                    key={colIndex}
                                    letter={letter}
                                    color={rowColors[colIndex]}
                                    multiple={multiples.includes(`${rowIndex}.${colIndex}`)}
                                />
                            )
                        })}
                </Flex>)
            })}
        </Flex>
    )
}