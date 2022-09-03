import React from 'react';
import {
    HashRouter,
    Routes,
    Route
} from 'react-router-dom'
import { Game } from './components/Game/Game.js'
import { ToastContainer, Flip } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { Fonts } from './theme/Fonts.js'
import { theme } from './theme/theme.js'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { GlobalStyles } from './theme/GlobalStyles'
import { HelperPage } from './components/HelperPage/HelperPage'

function App() {
    return (
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
            <Fonts />
            <GlobalStyles />
            <HashRouter>
                <Routes>
                    <Route exact path="/" element={<Game />} />
                    <Route path="/helper" element={<HelperPage />}/>
                </Routes>
            </HashRouter>
            <ToastContainer
                autoClose={1000}
                transition={Flip}
                position="bottom-center"
                pauseOnHover={false}
            />
        </ChakraProvider>
    )
}
export default App;
