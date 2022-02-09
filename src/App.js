import React from 'react';
import { Game } from './components/Game.js'
import { Settings } from './components/SettingsMenu/Settings.js'
import { IntroCompo } from './components/SettingsMenu/IntroCompo.js'

function App() {
    const [route, changeRoute] = React.useState("")
    const [routes, setRoutes] = React.useState({})

    React.useEffect(() => {
        setRoutes({
            game: (<Game setroute={changeRoute}/>),
            settings: (<Settings setroute={changeRoute}/>)
        })    
    }, [])

    const nickname = localStorage.getItem("nickname")
    if(nickname === null){
        return <IntroCompo setroute={changeRoute}/>
    }

    return (
        route in routes ? 
        routes[route] :
        <Game setroute={changeRoute}/>
    )
}
export default App;
