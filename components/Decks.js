import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { fetchStorageData } from '../utils/api'
import { loadData } from '../redux/actions'

class Decks extends Component {

  componentDidMount() {
    fetchStorageData()
      .then(data => {
        if (data !== null)
          this.props.dispatch(loadData(JSON.parse(data)))
      })
  }

  handleDeckClick = (key) => this.props.navigation.navigate('Deck', {
    deckID: key
  })

  render() {
    const { state } = this.props
    return (
      <View style={styles.container}>
        {
          state !== {} &&
          Object.keys(state).reverse().map(key => (
            <TouchableOpacity style={styles.deck} key={key} onPress={() => this.handleDeckClick(key)}>
              <View>
                <Text style={{ fontSize: 20 }}>{key}</Text>
                <Text style={styles.cardsNum}>{state[key].questions && state[key].questions.length} cards</Text>
              </View>
            </TouchableOpacity>
          ))}
        {
          Object.getOwnPropertyNames(state).length === 0 && <Text style={{ textAlign: 'center' }}>
            You don't have any decks currently
           </Text>
        }
      </View>
    )
  }
}

export default connect((state) => ({
  state
}))(Decks);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 50,

  },
  deck: {
    backgroundColor: '#f7f7f7',
    margin: 10,
    alignItems: 'center',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 2,
  },
  cardsNum: {
    color: 'gray',
    textAlign: 'center'
  }
})