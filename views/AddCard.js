import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { addCardToDeck } from '../utils/api';
import { addCard } from '../actions';
import TextButton from '../components/TextButton';
import TextInput from '../components/TextInput';

class AddCard extends Component {
    state = {
        question: '',
        answer: '',
    }

    onSubmitHandler = () => {
        const { title } = this.props.navigation.state.params;
        if (this.state.question !== '' && this.state.answer !== '') {
            const card = {
                question: this.state.question,
                answer: this.state.answer,
            }
            this.props.dispatch(addCard(title, card));
            addCardToDeck(title, card);
            this.props.navigation.dispatch(NavigationActions.navigate({
                routeName: 'DeckDetail',
                params: {
                    title: title,
                },
            }))
        } else {
            Alert.alert('You need both a question and an answer!');
        }
    }

    render() {
        const question = this.state.question;
        const answer = this.state.answer;
        return (
            <ScrollView scrollEnabled={false}>
                <KeyboardAvoidingView behaviour='padding' style={styles.container}>
                    <View style={{flex: 1}}>
                        <View style={styles.input}>
                            <Text>Question:</Text>
                            <TextInput autoFocus={false} value={question} onChange={(value) => this.setState({ question: value })} />
                        </View>
                        <View style={styles.input}>
                            <Text>Answer:</Text>
                            <TextInput style={styles.input} autoFocus={false} value={answer} onChange={(value) => this.setState({ answer: value })} />
                        </View>
                    </View>
                    <View style={styles.button}>
                        <TextButton onPress={this.onSubmitHandler}>
                            Submit
                        </TextButton>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    button: {
        flex: 1,
    },
    input: {
        padding: 15
    }
})

export default connect()(AddCard);
