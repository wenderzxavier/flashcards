import React from 'react';
import { View, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import { red } from './utils/colors';

import reducer from './reducers';
import NewDeck from './views/NewDeck';
import DeckOverview from './views/DeckOverview';
import DeckDetail from './views/DeckDetail';
import AddCard from './views/AddCard';
import Questions from './views/Questions';

function FlashStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

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
})

const MainNavigator = StackNavigator({
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
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <FlashStatusBar backgroundColor={red} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
