import React from 'react'
import { Image, HStack, Heading, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import { ThemeSwitch } from '../Buttons/ThemeSwitch'
import { LengthSwitch } from '../Buttons/LengthSwitch'
import { useNavigate } from 'react-router-dom'
import homeLight from '../../img/homeLight.png'
import homeDark from '../../img/homeDark.png'

export const Header = () => {
    const navigate = useNavigate()
    return (
        <HStack
            pl={2}
            pr={2}
            w="100%" 
            justify="space-between" 
            maxW="500px" 
            mt={2} 
            position="relative" 
            borderBottom="1px solid" 
            pb={2}
            h={useBreakpointValue({base: "1em", sm: "1em", md: "3em"})}
        >
            <HStack>
                <ThemeSwitch />
                <LengthSwitch />
            </HStack>
            <Heading
                position="absolute"
                textAlign="center"
                left={0}
                right={0}
                zIndex={-1}
                size={useBreakpointValue({base: "sm", sm: "sm", md: "lg"})}
            >
                Helper
            </Heading>

            <HStack className="menu" spacing={2}>
                <Image 
                    alt="cogwheel" 
                    onClick={() => navigate("/")} 
                    className="icon" 
                    src={useColorModeValue(homeLight, homeDark)}
                />
            </HStack>
        </HStack>
    )
}