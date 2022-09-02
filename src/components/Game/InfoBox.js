import React from 'react'
import { Box, Link, Text, useBreakpointValue, useColorMode } from '@chakra-ui/react'
import { appColors } from '../../theme/theme';

const URL = "https://slovnik.juls.savba.sk/?w=";

export const InfoBox = ({targetWord}) => {
    const { colorMode } = useColorMode()
    return (
        <Box m={1}>
            <Text 
                fontSize={useBreakpointValue({base: 12, sm: 20})} 
                as='b'
            >
                Hľadané slovo je&nbsp;
                <Link
                    href={`${URL}${targetWord}`} 
                    target="blank" 
                    color={appColors[colorMode].href}
                >
                    {targetWord}
                </Link>
            </Text>
        </Box>
    )
}
