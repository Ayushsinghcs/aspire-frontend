import type { Card } from '../../../shared/types'

/**
 * State interface for the card slice
 */
export interface CardState {
  /** Array of all cards */
  cards: Card[]
  /** Loading state for async operations */
  loading: boolean
  /** Error message if any operation fails */
  error: string | null
  /** Currently selected card */
  selectedCard: Card | null
  /** Map of card IDs to their details visibility state */
  cardDetailsVisibility: Record<number, boolean>
}

/**
 * Payload for card selection action
 */
export interface SelectCardPayload {
  cardId: number
}

/**
 * Payload for card update action
 */
export interface UpdateCardPayload {
  id: number
  data: Partial<Card>
}

/**
 * Payload for card update success action
 */
export interface UpdateCardSuccessPayload {
  id: number
  updatedCard: Card
}

/**
 * Async thunk return types
 */
export interface FetchCardsResult {
  cards: Card[]
}

export interface AddCardResult {
  card: Card
}

export interface UpdateCardResult {
  id: number
  updatedCard: Card
} 