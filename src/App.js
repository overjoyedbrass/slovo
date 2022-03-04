import React from 'react';
import {
    HashRouter,
    Routes,
    Route
} from 'react-router-dom'
import { Game } from './components/Game.js'
import { Settings } from './components/SettingsMenu/Settings.js'
import { IntroCompo } from './components/SettingsMenu/IntroCompo.js'
import { useSelector } from 'react-redux';

import { ToastContainer, Flip } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

function App() {
    const nick = useSelector(state => state.nickname.nick)
    return (
        <>
        <HashRouter>
            <Routes>
                <Route exact path="/" element={nick === undefined ? <IntroCompo /> : <Game />}/>
                <Route path="/settings" element={<Settings />}/>
            </Routes>
        </HashRouter>
        <ToastContainer
            autoClose={1000}
            transition={Flip}
            position="bottom-center"
            pauseOnHover={false}
        />
        </>
    )
}
export default App;
