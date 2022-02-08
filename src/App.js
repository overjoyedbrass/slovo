import { Game } from './components/Game.js'

import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from 'react-router-dom'
import { Settings } from './components/SettingsMenu/Settings.js';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Game /> }/>
                <Route path="/tools" element={ <Settings /> }/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
