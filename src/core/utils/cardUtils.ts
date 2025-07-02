import { CARD_CONSTANTS, CARD_BACKGROUND_COLORS, DEFAULT_CARD_PROPERTIES } from '../constants/cardConstants'
import type { Card } from '../../shared/types'

/**
 * Generates a random card number with proper formatting
 * @returns Formatted card number (e.g., "4111 1111 1111 1111")
 */
export const generateRandomCardNumber = (): string => {
  const { CARD_NUMBER_PREFIX, CARD_NUMBER_LENGTH, CARD_NUMBER_GROUP_SIZE } = CARD_CONSTANTS
  
  let cardNumber = CARD_NUMBER_PREFIX
  
  // Generate random digits to complete the card number
  while (cardNumber.length < CARD_NUMBER_LENGTH) {
    cardNumber += Math.floor(Math.random() * 10).toString()
  }
  
  // Format the card number with spaces every 4 digits
  return cardNumber.match(new RegExp(`.{1,${CARD_NUMBER_GROUP_SIZE}}`, 'g'))?.join(' ') || cardNumber
}

/**
 * Generates a random expiry date in MM/YY format
 * @returns Formatted expiry date (e.g., "12/25")
 */
export const generateRandomExpiry = (): string => {
  const { EXPIRY_YEARS_RANGE } = CARD_CONSTANTS
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear() % 100
  
  // Generate random month (1-12)
  const month = Math.floor(Math.random() * 12) + 1
  
  // Generate random year within the specified range
  const year = currentYear + Math.floor(Math.random() * EXPIRY_YEARS_RANGE) + 1
  
  // Format with leading zeros
  const formattedMonth = month.toString().padStart(2, '0')
  const formattedYear = year.toString().padStart(2, '0')
  
  return `${formattedMonth}/${formattedYear}`
}

/**
 * Generates a random CVV number
 * @returns Random CVV between 100-999
 */
export const generateRandomCVV = (): number => {
  const { CVV_MIN, CVV_MAX } = CARD_CONSTANTS
  return Math.floor(Math.random() * (CVV_MAX - CVV_MIN + 1)) + CVV_MIN
}

/**
 * Generates a random background color for cards
 * @returns Random color from the predefined color palette
 */
export const generateRandomBgColor = (): string => {
  return CARD_BACKGROUND_COLORS[Math.floor(Math.random() * CARD_BACKGROUND_COLORS.length)]
}

/**
 * Retrieves cards from localStorage
 * @returns Array of cards or empty array if none found
 */
export const getStoredCards = (): Card[] => {
  const { STORAGE_KEYS } = CARD_CONSTANTS
  try {
    const storedCards = localStorage.getItem(STORAGE_KEYS.CARDS)
    return storedCards ? JSON.parse(storedCards) : []
  } catch (error) {
    console.error('Error reading cards from localStorage:', error)
    return []
  }
}

/**
 * Saves cards to localStorage
 * @param cards - Array of cards to save
 */
export const saveCardsToStorage = (cards: Card[]): void => {
  const { STORAGE_KEYS } = CARD_CONSTANTS
  try {
    localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(cards))
  } catch (error) {
    console.error('Error saving cards to localStorage:', error)
  }
}

/**
 * Finds a card by its ID
 * @param cards - Array of cards to search in
 * @param id - Card ID to find
 * @returns Card object or undefined if not found
 */
export const findCardById = (cards: Card[], id: number): Card | undefined => {
  return cards.find((card) => card.id === id)
}

/**
 * Finds the index of a card by its ID
 * @param cards - Array of cards to search in
 * @param id - Card ID to find
 * @returns Index of the card or -1 if not found
 */
export const findCardIndexById = (cards: Card[], id: number): number => {
  return cards.findIndex((card) => card.id === id)
}

/**
 * Generates a new unique ID for cards
 * @param cards - Existing cards array
 * @returns Next available ID
 */
export const generateNextCardId = (cards: Card[]): number => {
  const maxId = cards.length > 0 ? Math.max(...cards.map((card) => card.id)) : 0
  return maxId + 1
}

/**
 * Creates a new card with generated properties
 * @param cardData - Basic card data (name)
 * @param cards - Existing cards array for ID generation
 * @returns New card with all required properties
 */
export const createNewCard = (cardData: Pick<Card, 'name'>, cards: Card[]): Card => {
  return {
    ...cardData,
    id: generateNextCardId(cards),
    balance: DEFAULT_CARD_PROPERTIES.BALANCE,
    number: generateRandomCardNumber(),
    expiry: generateRandomExpiry(),
    cvv: generateRandomCVV(),
    bgColor: generateRandomBgColor(),
    status: DEFAULT_CARD_PROPERTIES.STATUS,
    transactions: [],
  }
} 