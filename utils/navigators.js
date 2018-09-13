import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import NewDeck from '../views/NewDeck';
import DeckOverview from '../views/DeckOverview';
import DeckDetail from '../views/DeckDetail';
import AddCard from '../views/AddCard';
import Questions from '../views/Questions';

const Tabs = TabNavigator({
    DeckOverview: {
        screen: DeckOverview,
        navigationOptions: {
            tabBarLabel: 'Deck Overview',
            tabBarIcon: ({ tintcolor }) => <Ionicons name='ios-home' size={30} color={tintcolor} />
        }
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'New Deck',
            tabBarIcon: ({ tintcolor }) => <FontAwesome name='plus-square' size={30} color={tintcolor} />
        }
    },
}, {
    navigationOptions: {
        header: null
    },
});

export const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs,
    },
    DeckDetail: {
        screen: DeckDetail,
    },
    AddCard: {
        screen: AddCard,
    },
    Questions: {
        screen: Questions,
    }
});