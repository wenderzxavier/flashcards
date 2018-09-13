import React, { Component } from 'react';
import { View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Alert
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import TextButton from '../components/TextButton';
import TextInput from '../components/TextInput';
import { addDeck } from '../actions';
import { saveDeckTitle } from '../utils/api';
import { generateId } from '../utils/helpers';


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
            this.props.dispatch(addDeck(payload));
            saveDeckTitle(payload);
            this.toHome();
        } else {
            Alert.alert('You need to provide a title!');
        }
    }

    onChangeHandler = (value) => {
        this.setState({ title: value });
    }

    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: 'NewDeck'
        }));
    }

    render() {
        const value = this.state.title;
        return (
            <ScrollView scrollEnabled={false}>
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <View style={{flex: 1}}>
                        <Text style={styles.text}>What is the title of your new deck?</Text>
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

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps)(NewDeck);