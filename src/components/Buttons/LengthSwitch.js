import React from "react";
import { useGameStore } from '../../app/store.js'
import fiveIcon from '../../img/five.png'
import sixIcon from '../../img/six.png'
import { Image } from "@chakra-ui/react";

export const LengthSwitch = () => {
    const length = useGameStore((state) => state.length)
    const switchLength = useGameStore((state) => state.switchLength)
    
    const icons = {
        5: fiveIcon,
        6: sixIcon
    }
    
    return (
        <Image
            className="icon"
            src={icons[length]}
            onClick={switchLength}
        />
    )
}