import React from 'react'

import bulbLight from '../../img/bulbLight.png'
import bulbDark from '../../img/bulbDark.png'

import { useColorMode, useColorModeValue, Image } from '@chakra-ui/react'

export const ThemeSwitch = () => {
    const { toggleColorMode } = useColorMode()

    return (
        <Image alt="themeicon" 
            onClick={toggleColorMode}
            className="icon"
            src={useColorModeValue(bulbLight, bulbDark)}
        />
    )
}