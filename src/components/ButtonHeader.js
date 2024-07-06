//Este archivo contiene el componente de botones usados en la camara (flash, tomar foto, etc)

import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import{ Entypo, FontAwesome } from '@expo/vector-icons' 


export default function ButtonHeader ({ onPress, icon, color }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <FontAwesome name={icon} size={30} color={color ? color : 'red'}>
            </FontAwesome>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
       marginRight: 10
    },
    
}) 