import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { getDeck, clearLocalNotification, setLocalNotification } from '../utils/api';
import { orange } from '../utils/colors';
import TextButton from '../components/TextButton';

export default class Questions extends Component {
    state = {
        deck: {},
        activeCard: {},
        score: [],
        totalScore: 0,
        viewScore: false,
        viewAnswer: false,
    }

    componentDidMount() {
        const { title } = this.props.navigation.state.params;
        getDeck(title)
            .then((results) => {
                this.setState({
                    deck: results,
                    activeCard: results.questions[0]
                })
            })
        clearLocalNotification()
            .then(setLocalNotification);
    }

    correct = () => {
        const index = this.state.deck.questions.indexOf(this.state.activeCard);
        let newScore = this.state.score;
        newScore[index] = 1;

        this.setState({
            score: newScore
        }, () => this.calculateScore())
        this.nextCard(index + 1);
    }

    incorrect = () => {
        const index = this.state.deck.questions.indexOf(this.state.activeCard);
        let newScore = this.state.score;
        newScore[index] = 0;

        this.setState({
            score: newScore
        }, () => this.calculateScore())
        this.nextCard(index + 1);
    }

    calculateScore = () => {
        const totalScore = this.state.score.reduce((total, score) => total + score);
        this.setState({
            totalScore,
        })
    }

    nextCard = (index) => {
        if (this.state.deck.questions.length < index + 1) {
            this.setState({
                viewScore: true,
                viewAnswer: false,
            });
        } else {
            this.setState({
                activeCard: this.state.deck.questions[index],
                viewAnswer: false,
            });
        }
    }

    endQuiz = () => {
        this.props.navigation.goBack();
    }

    restart = () => {
        this.setState((prevState) => ({
            activeCard: prevState.deck.questions[0],
            score: [],
            totalScore: 0,
            viewScore: false,
            viewAnswer: false,
        }));
    }

    render() {
        const numberOfCards = this.state.deck.questions ? this.state.deck.questions.length : 0;
        const indexOfCard = numberOfCards > 0 ? this.state.deck.questions.indexOf(this.state.activeCard) + 1 : 0;
        return (
            <View style={styles.container}>
                <View style={styles.progress}>
                    <Text>{indexOfCard}/{numberOfCards}</Text>
                </View>
                {
                    !this.state.viewScore
                        ?
                        <View style={{ flex: 4 }}>
                            {
                                !this.state.viewAnswer
                                    ?
                                    <View style={styles.question}>
                                        <Text style={styles.text}>
                                            {this.state.activeCard.question}
                                        </Text>
                                        <Text
                                            style={styles.shiftView}
                                            onPress={() => this.setState({ viewAnswer: !this.state.viewAnswer })}>
                                            Show Answer
                                </Text>
                                    </View>
                                    :
                                    <View style={styles.question}>
                                        <Text style={styles.text}>
                                            {this.state.activeCard.answer}
                                        </Text>
                                        <Text
                                            style={styles.shiftView}
                                            onPress={() => this.setState({ viewAnswer: !this.state.viewAnswer })}>
                                            Show Question
                                </Text>
                                    </View>
                            }
                            <View style={styles.buttons}>
                                <TextButton onPress={this.correct}>
                                    Correct!
                            </TextButton>
                                <TextButton onPress={this.incorrect}>
                                    Incorrect.
                            </TextButton>
                            </View>
                        </View>
                        :
                        <View style={styles.score}>
                            <Text style={styles.text}>Your score is:</Text>
                            <Text style={styles.text}>
                                {(this.state.totalScore * 100 / numberOfCards).toFixed(2)}%
                            </Text>
                            <TextButton onPress={this.restart}>
                                Restart
                            </TextButton>
                            <TextButton onPress={this.endQuiz}>
                                End Quiz
                            </TextButton>
                        </View>
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 15,
    },
    progress: {
        flex: 1
    },
    question: {
        flex: 4,
        justifyContent: 'flex-start',
    },
    text: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    buttons: {
        flex: 4
    },
    score: {
        flex: 1
    },
    shiftView: {
        textAlign: 'center',
        color: orange
    }
})