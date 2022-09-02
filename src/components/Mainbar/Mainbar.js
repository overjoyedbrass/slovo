import React from 'react'
import { useNavigate } from 'react-router-dom'
import { HintModal } from './HintModal'
import settingsDark from '../../img/settingsDark.png'
import settingsLight from '../../img/settingsLight.png'
import shareLight from '../../img/shareLight.png'
import shareDark from '../../img/shareDark.png'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import { Heading, HStack, Image, useBreakpoint, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import { ThemeSwitch } from '../Buttons/ThemeSwitch.js'
import { LengthSwitch } from '../Buttons/LengthSwitch'

async function copyTextToClipboard(text) {
    await text
    if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
    } 
    else {
        return document.execCommand('copy', true, text);
    }
}

export const Mainbar = ({ share, strtable }) => {
    const navigate = useNavigate()
    const copyText = `Slovo ${format(new Date(), "d.M.")}  (${strtable.length}/6)\n\n${strtable.join('\n')}`

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
            <Global 
                styles={`
                    .icon {
                        width: ${useBreakpointValue({base: "1.2em", sm: "1.2em", md: "2em"})};
                    }
                `}
            />
            <HStack spacing={2}>
                <HintModal />
                {share ? <CopyToClipBoard text={copyText} /> : null }
            </HStack>

            <Heading
                position="absolute"
                textAlign="center"
                left={0}
                right={0}
                zIndex={-1}
                size={useBreakpointValue({base: "sm", sm: "sm", md: "lg"})}
            >
                SLOVO
            </Heading>

            <HStack className="menu" spacing={2}>
                <LengthSwitch />
                <ThemeSwitch />
                <Image 
                    alt="cogwheel" 
                    onClick={() => navigate("/helper")} 
                    className="icon" 
                    src={useColorModeValue(settingsLight, settingsDark)}
                />
            </HStack>
        </HStack>
    )
}

const CopyToClipBoard = ({ text }) => {
    const makeCopy = async () => {
        await copyTextToClipboard(text)
        toast.info("Skopírované", {position: "top-center", toastId: 333})
    }
    
    return (
        <Image 
            alt="shareicon" 
            onClick={() => makeCopy()}  
            className="icon" 
            src={useColorModeValue(shareLight, shareDark)}
        />
    )
}
