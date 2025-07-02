import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { cardService } from '../api/cardService'
import type { Card } from '../../shared/types'
import type { CardState, UpdateCardPayload } from './types/cardTypes'
import { CARD_ACTION_TYPES } from './constants/cardActionTypes'

/**
 * Initial state for the card slice
 */
const initialState: CardState = {
  cards: [],
  loading: true,
  error: null,
  selectedCard: null,
  cardDetailsVisibility: {},
}

/**
 * Async thunk to fetch all cards
 */
export const fetchCards = createAsyncThunk(
  CARD_ACTION_TYPES.FETCH_CARDS,
  async (): Promise<Card[]> => {
    const cards = await cardService.getCards()
    return cards
  }
)

/**
 * Async thunk to add a new card
 */
export const addCard = createAsyncThunk(
  CARD_ACTION_TYPES.ADD_CARD,
  async (name: string): Promise<Card> => {
    const newCard = await cardService.createCard({ name })
    return newCard
  }
)

/**
 * Async thunk to update an existing card
 */
export const updateCard = createAsyncThunk(
  CARD_ACTION_TYPES.UPDATE_CARD,
  async ({ id, data }: UpdateCardPayload): Promise<{ id: number; updatedCard: Card }> => {
    const updatedCard = await cardService.updateCard(id, data)
    return { id, updatedCard }
  }
)

/**
 * Card slice with reducers and async thunk handling
 */
const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    /**
     * Selects a card by ID
     */
    selectCard: (state, action: PayloadAction<number>) => {
      const card = state.cards.find((c) => c.id === action.payload)
      if (card) {
        state.selectedCard = card
      }
    },

    /**
     * Toggles the card details visibility for a specific card
     */
    toggleCardDetails: (state, action: PayloadAction<number>) => {
      const cardId = action.payload
      state.cardDetailsVisibility[cardId] = !state.cardDetailsVisibility[cardId]
    },

    /**
     * Sets the card details visibility explicitly for a specific card
     */
    setCardDetailsVisibility: (state, action: PayloadAction<{ cardId: number; visible: boolean }>) => {
      const { cardId, visible } = action.payload
      state.cardDetailsVisibility[cardId] = visible
    },

    /**
     * Clears any error state
     */
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // Handle fetchCards async thunk
    builder
      .addCase(fetchCards.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.loading = false
        state.cards = action.payload
        // Auto-select the first card if available
        state.selectedCard = action.payload?.[0] || null
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch cards'
      })

    // Handle addCard async thunk
    builder
      .addCase(addCard.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.loading = false
        state.cards.push(action.payload)
      })
      .addCase(addCard.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to add card'
      })

    // Handle updateCard async thunk
    builder
      .addCase(updateCard.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        state.loading = false
        const { id, updatedCard } = action.payload
        
        // Update card in the cards array
        state.cards = state.cards.map((card) => 
          card.id === id ? updatedCard : card
        )
        
        // Update selected card if it's the one being updated
        if (state.selectedCard && state.selectedCard.id === id) {
          state.selectedCard = updatedCard
        }
      })
      .addCase(updateCard.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to update card'
      })
  },
})

// Export actions
export const { 
  selectCard, 
  toggleCardDetails, 
  setCardDetailsVisibility, 
  clearError 
} = cardSlice.actions

// Export reducer
export default cardSlice.reducer 