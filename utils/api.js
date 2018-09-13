import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';
import { DECKS_STORAGE_KEY, NOTIFICATION_KEY } from './keys';

export function getDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
}

export function getDeck(title) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            results = JSON.parse(results);
            return results[title];
        });
}

export function saveDeckTitle(deck) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [deck.title]: {
            title: deck.title,
            questions: []
        },
    }));
}

export function addCardToDeck(title, card) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            results = JSON.parse(results);
            const newDecks = {
                ...results,
                [title]: {
                    ...results[title],
                    questions: [
                        ...results[title].questions,
                        card
                    ]
                }
            };
            AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(newDecks));
        });
}

function createNotification() {
    return {
        title: 'Do a quiz!',
        body: "🤓 don't forget to do a quiz today",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    };
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync);
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            tomorrow.setHours(20);
                            tomorrow.setMinutes(0);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            );

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                        }
                    });
            }
        });
}