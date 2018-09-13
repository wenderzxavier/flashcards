import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class DeckListItem extends Component {
    render() {
        const { title, cards, onPress } = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.numberOfCards}>Number of cards: {cards}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 7,
        padding: 5,
        margin: 5,
        height: 100,
        justifyContent: 'center',

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    numberOfCards: {
        fontSize: 15,
        textAlign: 'center',
    }
})