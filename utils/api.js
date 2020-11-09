import AsyncStorage from "@react-native-async-storage/async-storage"
import * as  Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

export const DECKS_KEY = 'decks'
export const NOTIFICATION_KEY = 'quiz'

export function fetchStorageData() {
  return AsyncStorage.getItem(DECKS_KEY)
}

export function saveDeckToStorage(deckID) {
  return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({ [deckID]: { title: deckID, questions: [] } }))
}

export function modifyDeckInStorage(question, deckID) {

  return AsyncStorage.getItem(DECKS_KEY)
    .then(results => {
      let decks = JSON.parse(results)
      decks = {
        ...decks,
        [deckID]: {
          ...decks[deckID],
          questions: decks[deckID].questions.concat(question)
        }
      }
      AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks))
    })
}


function createNotification() {
  return {
    title: "Quiz Reminder!",
    body: "Don't forget to take a quiz",
    priority: 'high',
    sound: true,
    vibrate: true,
    sticky: false
  }

}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(18)
              tomorrow.setMinutes(0)

              Notifications.scheduleNotificationAsync(
                {
                  content: createNotification(),
                  trigger: {
                    date: tomorrow,
                    repeats: 'day'
                  },
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }

    })
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}
