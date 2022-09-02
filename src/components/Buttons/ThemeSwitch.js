import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentTheme, setCurrentTheme } from '../../theme/themeSlice'

import bulbLight from '../../img/bulbLight.png'
import bulbDark from '../../img/bulbDark.png'

export const ThemeSwitch = () => {
    const keyTheme = useSelector(selectCurrentTheme)
    const dispatch = useDispatch()

    const switchTheme = () => {
        const newTheme = keyTheme === "dark" ? "light" : "dark"
        dispatch(setCurrentTheme(newTheme))
    }

    return (
        <img alt="themeicon" style={{float: 'right'}} onClick={switchTheme} className="icon" src={keyTheme === "dark" ? bulbDark : bulbLight} />
    )
}