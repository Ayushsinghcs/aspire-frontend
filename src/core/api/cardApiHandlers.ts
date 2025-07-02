import { http, HttpResponse } from 'msw'
import type { Card } from '../../shared/types'
import { CARD_CONSTANTS } from '../constants/cardConstants'
import { 
  getStoredCards, 
  saveCardsToStorage, 
  findCardById, 
  findCardIndexById,
  createNewCard 
} from '../utils/cardUtils'
import { CardStorageService } from '../services/cardStorageService'

// Initialize card storage with default data
CardStorageService.initialize()

/**
 * MSW handlers for card API endpoints
 * Provides mock API responses for card operations
 */
export const handlers = [
  /**
   * GET /api/cards - Fetch all cards
   */
  http.get(CARD_CONSTANTS.ENDPOINTS.CARDS, () => {
    try {
      const cards = getStoredCards()
      return HttpResponse.json(cards, {
        headers: {
          'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error('Error in GET /api/cards handler:', error)
      return new HttpResponse(null, { 
        status: 500,
        statusText: 'Internal Server Error'
      })
    }
  }),

  /**
   * GET /api/cards/:id - Fetch a specific card by ID
   */
  http.get('/api/cards/:id', ({ params }) => {
    try {
      const cardId = Number(params.id)
      const cards = getStoredCards()
      const card = findCardById(cards, cardId)

      if (!card) {
        return new HttpResponse(null, { 
          status: CARD_CONSTANTS.HTTP_STATUS.NOT_FOUND,
          statusText: CARD_CONSTANTS.ERROR_MESSAGES.CARD_NOT_FOUND
        })
      }

      return HttpResponse.json(card, {
        headers: {
          'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error('Error in GET /api/cards/:id handler:', error)
      return new HttpResponse(null, { 
        status: 500,
        statusText: 'Internal Server Error'
      })
    }
  }),

  /**
   * POST /api/cards - Create a new card
   */
  http.post(CARD_CONSTANTS.ENDPOINTS.CARDS, async ({ request }) => {
    try {
      const newCardData = (await request.json()) as Pick<Card, 'name'>
      const cards = getStoredCards()
      
      // Create new card with generated properties
      const cardWithId = createNewCard(newCardData, cards)
      
      // Add to storage
      cards.push(cardWithId)
      saveCardsToStorage(cards)

      return HttpResponse.json(cardWithId, { 
        status: CARD_CONSTANTS.HTTP_STATUS.CREATED,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error('Error in POST /api/cards handler:', error)
      return new HttpResponse(null, { 
        status: 500,
        statusText: 'Internal Server Error'
      })
    }
  }),

  /**
   * PUT /api/cards/:id - Update a specific card
   */
  http.put('/api/cards/:id', async ({ params, request }) => {
    try {
      const cardId = Number(params.id)
      const updateData = (await request.json()) as Partial<Card>
      const cards = getStoredCards()
      const cardIndex = findCardIndexById(cards, cardId)

      if (cardIndex === -1) {
        return new HttpResponse(null, { 
          status: CARD_CONSTANTS.HTTP_STATUS.NOT_FOUND,
          statusText: CARD_CONSTANTS.ERROR_MESSAGES.CARD_NOT_FOUND
        })
      }

      // Update the card
      const updatedCard = { ...cards[cardIndex], ...updateData }
      cards[cardIndex] = updatedCard
      saveCardsToStorage(cards)

      return HttpResponse.json(updatedCard, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error('Error in PUT /api/cards/:id handler:', error)
      return new HttpResponse(null, { 
        status: 500,
        statusText: 'Internal Server Error'
      })
    }
  }),
] 