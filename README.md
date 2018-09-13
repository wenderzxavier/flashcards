# Mobile Flash Cards

This is the mobile flashcards project for thfor Udacity's React Native course. 
The app is a flash-card memory game where a user may create decks with cards, and test their memory skills. 

Fell free to try it and improve the code!

## Setup Instructions
  
* Download or fork and clone the [Flashcard](https://github.com/wenderzxavier/flashcards) repository using `git clone`.
* run `npm install` to install the required dependencies.
* run `npm start` or `yarn start` to compile and run the application.
* The app can be tested using an Android or iOS smartphone using [Expo](https://expo.io/) app.

## What's Included
```
 +-- components/ - Classes and components implemented on the applications.
  |-- DeckListItem.js - Display information related to the selected deck
  |-- TextButton.js - General implemetation for React Native Text Button
  |-- Text Input.js - General implementation for React Native Input Button
 +-- reducers/ - Reducers used to implement Redux store
  |-- index.js
 +-- utils/ - util files needed to create functionalitites and styles of the app
  |-- api.js - Calls for the api (AsyncStorage)
  |-- colors.js - Colors pallete available to use on the app
  |-- keys.js - Keys to implement notification
  |-- navigators.js - routes between screens on the app
 +-- views/ - main views of the app
  |-- AddCard.js - View with the feature to insert new card to the deck
  |-- DeckDetail.js - display single deck details to the user
  |-- DeckOverview.js - display all decks and respective information
  |-- NewDeck.js - feature to inser new deck to the app
  |-- Questions.js - screen displaying the deck question
|-- App.js - This is the root of your app. Contains routes and react components, showing the structure of the application.
|-- App.test.js - Used for testing. Not implemented.
|-- .gitignore 
|-- README.MD - This README file.
|-- package.json - npm package manager file. It's unlikely that you'll need to modify this.
```

## Create React App
This project was boostraped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## Tests
This project was tested on a Nexus 5 device running Android v6.0.1

## License
MIT License