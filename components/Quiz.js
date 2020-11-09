import React, { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/api'

export default function Quiz({ navigation, route }) {

  const { deckID } = route.params
  const state = useSelector(state => state)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [hiddenAnswer, setHiddenAnswer] = useState(true)
  const [score, setScore] = useState(0)
  const [toggleQuiz, settoggleQuiz] = useState(true)
  const { questions } = state[deckID]

  const finishQuiz = () => {
    settoggleQuiz(false)
    clearLocalNotification()
      .then(setLocalNotification)
  }

  const getNextQuestion = () => {
    questionNumber < questions.length - 1 ?
      setQuestionNumber(questionNumber + 1) :
      finishQuiz()
  }
  const handleCorrect = () => {
    setScore(score + 1)
    setHiddenAnswer(true)
    getNextQuestion()
  }


  const handleIncorrect = () => {
    setHiddenAnswer(true)
    getNextQuestion()
  }

  const handleRestartQuiz = () => {
    settoggleQuiz(true)
    setQuestionNumber(0)
    setScore(0)
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.numOfQuestions}>{questionNumber + 1} / {questions.length}</Text>
      {
        toggleQuiz === true ?
          <View style={styles.container}>
            <Text style={styles.question}>{questions[questionNumber].question} ?</Text>
            <View>
              {
                hiddenAnswer === true ?
                  <Button title='show answer' onPress={() => setHiddenAnswer(false)} />
                  :
                  <Text style={styles.answer}>{questions[questionNumber].answer}</Text>
              }
            </View>
            <View style={styles.btnGroup}>
              <Button color='#f44336' title='correct' onPress={handleCorrect} />
              <Button color='#4CAF50' title='incorrect' onPress={handleIncorrect} />
            </View>
          </View>
          :
          <View style={styles.container}>
            <View>
              <Text style={styles.score}>Your Score is </Text>
              <Text style={styles.score}>{Math.floor((score / questions.length) * 100)}%</Text>
            </View>
            <View style={styles.btnGroup}>
              <Button title='Back To Deck' onPress={() => navigation.navigate('Deck')} />
              <Button color='black' title='Restart Quiz' onPress={handleRestartQuiz} />
            </View>
          </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    justifyContent: 'space-evenly',
    padding: 20
  },
  numOfQuestions: {
    fontWeight: 'bold',
    fontSize: 20, margin: 10
  },
  question: {
    textAlign: 'center',
    fontSize: 40
  },
  answer: {
    textAlign: 'center',
    fontSize: 20,
    color: '#2196F3'
  },
  btnGroup: {
    height: 90,
    justifyContent: 'space-between'
  },
  score: {
    fontSize: 30,
    textAlign: 'center'
  }
})