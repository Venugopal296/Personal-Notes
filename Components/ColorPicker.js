import React from "react";
import ColorPalette from 'react-native-color-palette'
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from "../Constants/Colors";

const ColorPicker = ({ color, selectColor }) => {
    return (
        <ColorPalette
            onChange={color => selectColor(color)}
            value={color}
            colors={[
                '#7a0046', '#bf086f', 
                '#b5050e', '#e3686f', 
                '#690482', '#cf5eeb', 
                '#2a048a', '#8963eb', 
                '#063b96', '#6a9ef7', 
                '#047885', '#044863',
                '#04611a', '#b85a07',
                '#6b5004', '#576305',
            ]}
            title={""}
            icon={
                <Icon name={'check'} size={20} color={Colors.secondary} />
            }
        />
    )
}

export default ColorPicker;