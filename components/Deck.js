import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

export default function Deck({ navigation, route }) {

  const state = useSelector(state => state)
  const { deckID } = route.params

  const handleAddCard = () => navigation.navigate('Add Card', { deckID })
  const handleQuizStart = () => navigation.navigate('Quiz', { deckID })
  
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.deckTitle}>{state[deckID].title}</Text>
        <Text style={styles.cardsNum}>{state[deckID].questions.length} Cards</Text>
      </View>
      <View style={styles.buttonGroup}>
        <Button title='Add Card' onPress={handleAddCard} />
        <Button disabled={state[deckID].questions.length === 0}
          color='black' title='Start Quiz' onPress={handleQuizStart} />
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 50
  },
  buttonGroup: {
    width: '80%',
    height: 120,
    justifyContent: 'space-between'
  },
  deckTitle: {
    textAlign: 'center', fontSize: 30
  },
  cardsNum: {
    textAlign: 'center', color: 'gray'
  }
})