import React from 'react'
import { Tablecell } from './Tablecell.js'

import { useSelector } from 'react-redux'
import { selectCurrentTheme } from '../../theme/themeSlice'
import { themes } from '../../theme/themes'
import { Flex } from '@chakra-ui/react'

export const Playtable = ({gameState, colors, multiples}) => {
    const theme = themes[useSelector(selectCurrentTheme)]
    return (
        <Flex 
            sx={{ aspectRatio: "1" }}
            w="100%"
            maxW="600px"
            maxH="60vh"
            grow={1}
            shrink={1}
            direction="column" 
            m="5vh 0"
            userSelect={"none"}
        >{
            gameState.map((row, rowIndex) => {
                const rowColors = colors[rowIndex]
                return (
                    <Flex 
                        key={rowIndex} 
                        justify="center"
                        grow={1}
                        flexBasis={0}
                    >{
                        row.map( (l, colIndex) => 
                            <Tablecell
                                key={colIndex}
                                letter={l}
                                color={rowColors[colIndex]}
                                theme={theme}
                                multiple={multiples.includes(`${rowIndex}.${colIndex}`)}
                            />
                        )}
                    </Flex>
                )
            })}
        </Flex>
    )
}