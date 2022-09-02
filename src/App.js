import React from 'react';
import {
    HashRouter,
    Routes,
    Route
} from 'react-router-dom'
import { Game } from './components/Game/Game.js'
import { ToastContainer, Flip } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { Fonts, theme } from './theme'
import { ChakraProvider } from '@chakra-ui/react';
function App() {
    return (
        <ChakraProvider theme={theme}>
            <Fonts />
            <HashRouter>
                <Routes>
                    <Route exact path="/" element={<Game />} />
                    <Route path="/helper" element={<div></div>}/>
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
