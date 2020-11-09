export const ADD_DECK = 'ADD_DECK';
export const ADD_QUESTION = 'ADD_QUESTION';
export const LOAD_DATA = 'LOAD_DATA';

export function addDeck(deckTitle) {
  return {
    type: ADD_DECK,
    deckTitle
  }
}

export function addQuestion(question, deckID) {
  return {
    type: ADD_QUESTION,
    question,
    deckID
  }
}

export function loadData(decks){
return{
  type: LOAD_DATA,
  decks
}
}