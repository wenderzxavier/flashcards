import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { red, white } from '../utils/colors';

export default function TextButton ({ children, onPress, style = {} }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        color: white,
        fontSize: 22,
    },
    button: {
        backgroundColor: red,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 15,
        paddingTop: 5,
    }
})