import { ADD_QUESTION, ADD_DECK, LOAD_DATA } from './actions'


export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOAD_DATA:
      return { ...state, ...action.decks }
    case ADD_DECK:
      return { ...state, [action.deckTitle]: { title: action.deckTitle, questions: [] } }
    case ADD_QUESTION:
      return {
        ...state,
        [action.deckID]: {
          ...state[action.deckID],
          questions: state[action.deckID].questions.concat(action.question)
        }
      }
    default:
      return state
  }
}