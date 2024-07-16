//Este archivo contiene el componente de botones usados en la camara (flash, tomar foto, etc)

import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import{ Entypo, FontAwesome } from '@expo/vector-icons' 

export default function ButtonCamera ({title, onPress, icon, color, size }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Entypo name={icon} size={size ? size : 26} color={color ? color : '#f1f1f1'}>
            <Text style={styles.text}> {title} </Text>
            </Entypo>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#f1f1f1',
        marginLeft: 10
    }
}) 