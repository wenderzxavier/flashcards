import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import TextButton from '../components/TextButton';
import { gray } from '../utils/colors';

class DeckDetail extends Component {
    state = {
        title: '',
        cards: [],
    }
    navigateAddCards = (title) => {
        this.props.navigation.dispatch(NavigationActions.navigate({
            routeName: 'AddCard',
            params: {
                title: title,
            },
        }))
    }
    componentDidMount() {
        const { title } = this.props.navigation.state.params;
        this.setState({
            title: title,
            cards: this.props.decks[title].questions
        })
    }

    navigateOverview = () => {
        this.props.navigation.dispatch(NavigationActions.navigate({
            routeName: 'Home',
        }))
    }

    navigateStartQuiz = (title) => {
        this.props.navigation.dispatch(NavigationActions.navigate({
            routeName: 'Questions',
            params: {
                title
            }
        }))
    }
    render() {
        const { title } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <View style={styles.text}>
                    <Text style={styles.title}>
                        {this.state.title}
                    </Text>
                    <Text style={styles.cards}>
                        {
                            this.props.decks[title] ?
                                this.props.decks[title].questions.length :
                                0
                        } cards
                    </Text>
                </View>
                <View style={styles.buttons}>
                    <TextButton onPress={() => { this.navigateAddCards(this.state.title) }}>
                        Add Card
                    </TextButton>
                    {
                        // Makes sure you cant start a quiz if there are no cards
                        this.state.cards.length > 0
                        &&
                        <TextButton onPress={() => { this.navigateStartQuiz(this.state.title) }}>
                            Start Quiz
                        </TextButton>
                    }
                    <TextButton onPress={this.navigateOverview}>
                        Go to Overview
                    </TextButton>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 15,
    },
    text: {
        flex: 1,
    },
    buttons: {
        flex: 1,
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    cards: {
        textAlign: 'center',
        fontSize: 15,
        color: gray
    }
});

const mapStateToProps = (decks) => ({
    decks
})

export default connect(mapStateToProps)(DeckDetail);