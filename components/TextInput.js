import React from 'react';
import { StyleSheet, TextInput, } from 'react-native';
import { gray, white } from '../utils/colors';

export default function UselessTextInput({ autoFocus, value, onChange }) {
    return (
        <TextInput
            style={styles.textInput}
            onChangeText={onChange}
            value={value}
            autoFocus={autoFocus}
        />
    );
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        borderColor: gray,
        borderWidth: 1,
        backgroundColor: white,
    }
});