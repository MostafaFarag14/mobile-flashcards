import 'react-native-gesture-handler';
import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'
import { setLocalNotification } from './utils/api'

//components
import Home from './components/Home'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import store from './redux/store'

const Stack = createStackNavigator();

class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }
  render() {

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Deck' component={Deck} />
            <Stack.Screen name='Add Card' component={AddCard} />
            <Stack.Screen name='Quiz' component={Quiz} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>

    )
  }
}

export default App