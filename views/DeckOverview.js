import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import DeckListItem from '../components/DeckListItem';
import { getDecks } from '../utils/api';
import { receiveDecks } from '../actions/index';
import { NavigationActions } from 'react-navigation';

class DeckOverview extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        getDecks()
            .then((decks) => dispatch(receiveDecks(decks)));
    }

    selectDeck = (title, cards) => {
        this.props.navigation.dispatch(NavigationActions.navigate({
            routeName: 'DeckDetail',
            params: {
                title: title,
                cards: cards,
            },
        }))
    }
    generateDecks = (decks) => {
        let deckArray = []

        Object.keys(decks).forEach((deck, i) => {
            const cards = decks[deck].questions ? decks[deck].questions.length : 0;
            const title = decks[deck].title;
            deckArray.push(
                <DeckListItem
                    title={title}
                    cards={cards}
                    key={i}
                    onPress={() => {
                        this.selectDeck(title, cards)
                    }}
                />
            );
        })
        return deckArray;
    }

    render() {
        const { decks } = this.props;
        return (
            <View>
                <Text style={styles.heading}>Decks that you can chose from.</Text>
                {
                    decks
                    && this.generateDecks(decks)
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})

const mapStateToProps = (decks) => ({
    decks
})

export default connect(mapStateToProps)(DeckOverview);
