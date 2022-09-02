import React from 'react'

import { endOfDay } from 'date-fns'
import { Text, useBreakpointValue } from '@chakra-ui/react'

export const Timer = () => {
    const [time, setTime] = React.useState(new Date())
    const eod = endOfDay(time)
    const h = eod.getHours() - time.getHours()
    const m = eod.getMinutes() - time.getMinutes()
    const s = eod.getSeconds() - time.getSeconds()

    let refresh = true
    let content
    if (h === 0 && m === 0 && s === 0){
        window.location.reload()
        refresh=false
    }
    else {
        content = `Nové slovo: ${h}h ${m}m ${s}s`
    }

    React.useEffect(() => {
        if(refresh){
            const interval = setInterval(() => setTime(new Date()), 1000)
            return () => clearInterval(interval)
        }
    })

    return (
        <Text 
            as='b' 
            fontSize={useBreakpointValue({base: 11, sm: 18})}
        >
            {content}
        </Text>
    )
}
