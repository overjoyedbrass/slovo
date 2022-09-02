import React from 'react'

import { Box, Flex,  useColorMode } from '@chakra-ui/react'
import { appColors as allAppColors } from '../../theme/theme.js'

export const Tablecell = ({letter, color, multiple, ...props}) => {
    const { colorMode } = useColorMode()
    const appColors = allAppColors[colorMode]
    const colors = { 
        backgroundColor: color, 
        borderColor: color ? color : letter ? appColors.cellBgFill : appColors.cellBg
    }

    return (
        <Flex
            className='tableCell'
            style={{ ...colors }}
            {...props}
        >
            <b>{ letter }</b>
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
