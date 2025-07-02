import type { Card } from '../../shared/types'
import { CARD_CONSTANTS } from '../constants/cardConstants'

/**
 * Service for handling card-related API operations
 * Provides methods for CRUD operations on cards
 */
export const cardService = {
  /**
   * Fetches all cards from the API
   * @returns Promise resolving to an array of cards
   * @throws Error if the request fails
   */
  getCards: async (): Promise<Card[]> => {
    try {
      const response = await fetch(CARD_CONSTANTS.ENDPOINTS.CARDS, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        // Use cache-first strategy for better performance
        cache: 'default',
      })
      
      if (!response.ok) {
        throw new Error(CARD_CONSTANTS.ERROR_MESSAGES.FETCH_CARDS_FAILED)
      }
      
      return response.json()
    } catch (error) {
      console.error('Error fetching cards:', error)
      throw error
    }
  },

  /**
   * Fetches a specific card by ID
   * @param id - The ID of the card to fetch
   * @returns Promise resolving to the card data
   * @throws Error if the request fails or card is not found
   */
  getCard: async (id: number): Promise<Card> => {
    try {
      const response = await fetch(CARD_CONSTANTS.ENDPOINTS.CARD_BY_ID(id), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        // Use cache-first strategy for better performance
        cache: 'default',
      })
      
      if (!response.ok) {
        if (response.status === CARD_CONSTANTS.HTTP_STATUS.NOT_FOUND) {
          throw new Error(CARD_CONSTANTS.ERROR_MESSAGES.CARD_NOT_FOUND)
        }
        throw new Error(CARD_CONSTANTS.ERROR_MESSAGES.FETCH_CARD_FAILED(id))
      }
      
      return response.json()
    } catch (error) {
      console.error(`Error fetching card ${id}:`, error)
      throw error
    }
  },

  /**
   * Creates a new card
   * @param cardData - Basic card data (name)
   * @returns Promise resolving to the created card
   * @throws Error if the request fails
   */
  createCard: async (cardData: Pick<Card, 'name'>): Promise<Card> => {
    try {
      const response = await fetch(CARD_CONSTANTS.ENDPOINTS.CARDS, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardData),
        // Don't cache POST requests
        cache: 'no-store',
      })

      if (!response.ok) {
        throw new Error(CARD_CONSTANTS.ERROR_MESSAGES.CREATE_CARD_FAILED)
      }

      return response.json()
    } catch (error) {
      console.error('Error creating card:', error)
      throw error
    }
  },

  /**
   * Updates an existing card
   * @param id - The ID of the card to update
   * @param cardData - Partial card data to update
   * @returns Promise resolving to the updated card
   * @throws Error if the request fails or card is not found
   */
  updateCard: async (id: number, cardData: Partial<Card>): Promise<Card> => {
    try {
      const response = await fetch(CARD_CONSTANTS.ENDPOINTS.CARD_BY_ID(id), {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardData),
        // Don't cache PUT requests
        cache: 'no-store',
      })

      if (!response.ok) {
        if (response.status === CARD_CONSTANTS.HTTP_STATUS.NOT_FOUND) {
          throw new Error(CARD_CONSTANTS.ERROR_MESSAGES.CARD_NOT_FOUND)
        }
        throw new Error(CARD_CONSTANTS.ERROR_MESSAGES.UPDATE_CARD_FAILED(id))
      }

      return response.json()
    } catch (error) {
      console.error(`Error updating card ${id}:`, error)
      throw error
    }
  },
}
