import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import Decks from './Decks';
import AddDeck from './AddDeck';

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ color, size, focused }) => {
    let iconName;
    if (route.name === 'Decks') {
      iconName = focused ? 'md-list-box' : 'md-list'
    }
    else if (route.name === 'Add Deck') {
      iconName = focused ? 'md-add-circle' : 'md-add-circle-outline'
    }
    return <Ionicons name={iconName} size={size} color={color} />
  }
})

export default function Home() {
  
  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBarOptions={{
        activeTintColor: 'red',
        inactiveTintColor: 'gray'
      }}
    >
      <Tab.Screen name='Decks' component={Decks} />
      <Tab.Screen name='Add Deck' component={AddDeck} />
    </Tab.Navigator>
  )
}
