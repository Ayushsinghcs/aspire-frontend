/**
 * Action type constants for the card slice
 * Prevents typos and makes refactoring easier
 */
export const CARD_ACTION_TYPES = {
  // Async thunk types
  FETCH_CARDS: 'card/fetchCards',
  ADD_CARD: 'card/addCard',
  UPDATE_CARD: 'card/updateCard',
  
  // Sync action types
  SELECT_CARD: 'card/selectCard',
  TOGGLE_CARD_DETAILS: 'card/toggleCardDetails',
  SET_CARD_DETAILS_VISIBILITY: 'card/setCardDetailsVisibility',
  CLEAR_ERROR: 'card/clearError',
} as const

/**
 * Action type values (for use in createSlice)
 */
export const CARD_ACTION_VALUES = {
  FETCH_CARDS_PENDING: `${CARD_ACTION_TYPES.FETCH_CARDS}/pending`,
  FETCH_CARDS_FULFILLED: `${CARD_ACTION_TYPES.FETCH_CARDS}/fulfilled`,
  FETCH_CARDS_REJECTED: `${CARD_ACTION_TYPES.FETCH_CARDS}/rejected`,
  
  ADD_CARD_PENDING: `${CARD_ACTION_TYPES.ADD_CARD}/pending`,
  ADD_CARD_FULFILLED: `${CARD_ACTION_TYPES.ADD_CARD}/fulfilled`,
  ADD_CARD_REJECTED: `${CARD_ACTION_TYPES.ADD_CARD}/rejected`,
  
  UPDATE_CARD_PENDING: `${CARD_ACTION_TYPES.UPDATE_CARD}/pending`,
  UPDATE_CARD_FULFILLED: `${CARD_ACTION_TYPES.UPDATE_CARD}/fulfilled`,
  UPDATE_CARD_REJECTED: `${CARD_ACTION_TYPES.UPDATE_CARD}/rejected`,
} as const 