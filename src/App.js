import React, { useEffect } from 'react';
import { Game } from './components/Game.js'
import { Settings } from './components/SettingsMenu/Settings.js'
function App() {
    const [route, changeRoute] = React.useState("game")
    const [routes, setRoutes] = React.useState({})

    React.useEffect(() => {
        setRoutes({
            game: (<Game setroute={changeRoute}/>),
            settings: (<Settings setroute={changeRoute}/>)
        })    
    }, [])
    return (
        route in routes ? 
        routes[route] :
        <Game setroute={changeRoute}/>
    )
}
export default App;
