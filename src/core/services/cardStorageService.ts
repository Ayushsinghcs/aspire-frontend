import type { Card } from '../../shared/types'
import { getStoredCards, saveCardsToStorage } from '../utils/cardUtils'
import { initialCards } from '../data/initialCards'

/**
 * Service for managing card data persistence
 * Handles localStorage operations and initial data setup
 */
export class CardStorageService {
  /**
   * Initializes the card storage with default data if empty
   * This should be called once when the application starts
   */
  static initialize(): void {
    const existingCards = getStoredCards()
    if (existingCards.length === 0) {
      saveCardsToStorage(initialCards)
    }
  }

  /**
   * Retrieves all cards from storage
   * @returns Array of all stored cards
   */
  static getAllCards(): Card[] {
    return getStoredCards()
  }

  /**
   * Saves all cards to storage
   * @param cards - Array of cards to save
   */
  static saveAllCards(cards: Card[]): void {
    saveCardsToStorage(cards)
  }

  /**
   * Adds a new card to storage
   * @param card - Card to add
   */
  static addCard(card: Card): void {
    const cards = getStoredCards()
    cards.push(card)
    saveCardsToStorage(cards)
  }

  /**
   * Updates an existing card in storage
   * @param updatedCard - Updated card data
   * @returns True if card was found and updated, false otherwise
   */
  static updateCard(updatedCard: Card): boolean {
    const cards = getStoredCards()
    const cardIndex = cards.findIndex((card) => card.id === updatedCard.id)
    
    if (cardIndex === -1) {
      return false
    }
    
    cards[cardIndex] = updatedCard
    saveCardsToStorage(cards)
    return true
  }

  /**
   * Removes a card from storage
   * @param cardId - ID of the card to remove
   * @returns True if card was found and removed, false otherwise
   */
  static removeCard(cardId: number): boolean {
    const cards = getStoredCards()
    const cardIndex = cards.findIndex((card) => card.id === cardId)
    
    if (cardIndex === -1) {
      return false
    }
    
    cards.splice(cardIndex, 1)
    saveCardsToStorage(cards)
    return true
  }

  /**
   * Clears all card data from storage
   */
  static clearAllCards(): void {
    saveCardsToStorage([])
  }

  /**
   * Resets storage to initial data
   */
  static resetToInitialData(): void {
    saveCardsToStorage(initialCards)
  }
} 