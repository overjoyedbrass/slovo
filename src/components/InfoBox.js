import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentTheme } from '../theme/themeSlice'
import { themes } from '../theme/themes'
import { Box, Link } from '@chakra-ui/react'

const URL = "https://slovnik.juls.savba.sk/?w=";

export const InfoBox = ({targetWord}) => {
    const theme = themes[useSelector(selectCurrentTheme)]
    return (
        <Box m={1}>
            Hľadané slovo je&nbsp;
            <Link href={`${URL}${targetWord}`} target="blank" style={{color: theme.href}}>
                {targetWord}
            </Link>
        </Box>
    )
}
