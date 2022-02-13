import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentLength, setNewLength } from "../../slices/gameState";
import { themes } from "../../theme/themes";
import { selectCurrentTheme } from "../../theme/themeSlice";

export const LengthPicker = () => {
    const length = useSelector(selectCurrentLength)
    const dispatch = useDispatch()
    const theme = themes[useSelector(selectCurrentTheme)]

    function changeValue(e){
        const newValue = e.target.value
        dispatch(setNewLength(parseInt(newValue)))
    }
    
    return <div className="container">
        Dĺžka slova:   <select onChange={(e) => changeValue(e)} value={length} style={{color: theme.textColor, backgroundColor: theme.bgColor}}>
            <option value={5} >5</option>
            <option value={6}>6</option>
        </select>
    </div>
}