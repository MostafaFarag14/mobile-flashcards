import React from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../redux/actions'
import { saveDeckToStorage } from '../utils/api'
class AddDeck extends React.Component {

  state = {
    deckName: ''
  }

  handleAddDeck = () => {
    const deckName = this.state.deckName
    this.setState(prevState => ({ deckName: '' }))
    this.props.dispatch(addDeck(deckName))
    this.props.navigation.navigate('Deck', { deckID: deckName })
    saveDeckToStorage(deckName)
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.deckTitle}>Title of Your New Deck ?</Text>
          <TextInput
            style={styles.input}
            placeholder='Deck Title'
            value={this.state.deckName}
            onChangeText={(text) => this.setState(prevState => ({ deckName: text }))}
          />
        </View>
        <Button
          title='Create Deck'
          disabled={this.state.deckName === ''}
          onPress={this.handleAddDeck}
        />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 20
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    margin: 10
  },
  deckTitle: { textAlign: 'center', fontSize: 30 }
})

export default connect()(AddDeck)