import React from 'react'

import { themes } from '../../theme/themes'
import { useSelector } from 'react-redux'
import { selectCurrentTheme } from '../../theme/themeSlice'
import { Box, Flex, Text } from '@chakra-ui/react'

export const Tablecell = ({letter, color, multiple}) => {
    const theme = themes[useSelector(selectCurrentTheme)]

    const colors = { 
        backgroundColor: color, 
        borderColor: color ? color : letter ? theme.cellBgFill : theme.cellBg
    }

    return (
        <Flex 
            style={{ ...colors, aspectRatio: "1"}}
            verticalAlign={"middle"}
            justify="center"
            align={"center"}
            border="2px solid"
            position="relative"
            rounded="lg"
            flexBasis={0}
            m="1"
            textTransform="uppercase"
            fontSize="3vh"
        >
            <Text as='b'>
                { letter }
            </Text>
            { multiple ?
            (<Box 
                position="absolute"
                fontSize="0.7em"
                fontWeight="bold"
                top="0px"
                right="4px"
            >
                +
            </Box>) : null }
        </Flex>
    )
}
