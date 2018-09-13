import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import TextButton from '../components/TextButton';
import TextInput from '../components/TextInput';
import { addDeck } from '../actions';
import { saveDeckTitle } from '../utils/api';

class NewDeck extends Component {
    state = {
        title: '',
    }

    onSubmitHandler = () => {
        if (this.state.title !== '') {
            const payload = {
                title: this.state.title,
                questions: [],
            }
            this.props.addDeck(payload);
            saveDeckTitle(payload);
            this.toOverview();
        } else {
            Alert.alert('Please, provide a title!');
        }
    }

    onChangeHandler = (value) => {
        this.setState({ title: value });
    }

    toOverview = () => {
        this.props.navigation.dispatch(NavigationActions.navigate({
            routeName: 'DeckDetail',
            params: {
                title: this.state.title,
                cards: 0
            }
        }));
    }

    render() {
        const value = this.state.title;
        return (
            <ScrollView scrollEnabled={false}>
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.text}>Enter the Name of Your Deck:</Text>
                    </View>
                    <View style={styles.input}>
                        <TextInput
                            autoFocus={false}
                            value={value}
                            onChange={(value) => this.onChangeHandler(value)}
                        />
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
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 15
    },
    form: {
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 35,
        textAlign: 'center',
        flex: 1,
        marginBottom: 15,
    },
    input: {
        flex: 1,
    },
    button: {
        flex: 1,
    }
});

export default connect(null, { addDeck })(NewDeck);