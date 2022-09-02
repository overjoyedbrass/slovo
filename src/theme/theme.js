import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

export const theme = extendTheme({
    config,
    styles: {
        global: (props) => ({
          body: {
            bg: mode("#D9D7F1", "#0c0911")(props),
          }
        })
      },
    fonts: {
        body: `'JetBrains Mono', sans-serif`,
    },
})

export const appColors = {
    "light": {                
        keyboardText: "white",
        keycell: "#363747",

        rightCell: '#28FFBF',
        containedCell: '#ffa642',
        wrongCell: '#BBBBBB',

        cellBgFill: "black",
        cellBg: "darkgrey",

        href: "purple",
    },
    "dark": {        
        keyboardText: "black",
        keycell: "#cccccc",

        rightCell: '#4ab575',
        containedCell: '#cba601',
        wrongCell: '#40394A',

        cellBgFill: "white",
        cellBg: "#444444",

        href: "lime"
    }
}