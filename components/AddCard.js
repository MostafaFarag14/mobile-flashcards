import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addQuestion } from '../redux/actions'
import { modifyDeckInStorage } from '../utils/api'

export default function AddCard({ navigation, route }) {
  const { deckID } = route.params
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(addQuestion({ question: question, answer: answer }, deckID))
    modifyDeckInStorage({ question: question, answer: answer }, deckID)
    navigation.goBack()
  }
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          placeholder='Question without "?"'
          value={question}
          onChangeText={(text) => setQuestion(text)}
        />
        <TextInput
          style={styles.input}
          placeholder='Answer'
          value={answer}
          onChangeText={text => setAnswer(text)}
        />
      </View>
      <Button title='Submit' onPress={handleSubmit} disabled={question === '' || answer === ''} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 50,
    justifyContent: 'space-between'
  },
  input: {
    marginVertical: 20,
    borderWidth: 1,
    borderColor: 'gray'
  }
})