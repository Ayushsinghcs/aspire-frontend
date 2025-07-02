/**
 * Card-related constants for the application
 */

export const CARD_CONSTANTS = {
  // Card number generation
  CARD_NUMBER_PREFIX: '4',
  CARD_NUMBER_LENGTH: 16,
  CARD_NUMBER_GROUP_SIZE: 4,
  
  // CVV generation
  CVV_MIN: 100,
  CVV_MAX: 999,
  
  // Expiry date generation
  EXPIRY_YEARS_RANGE: 5,
  
  // Local storage keys
  STORAGE_KEYS: {
    CARDS: 'cards',
  },
  
  // API endpoints
  ENDPOINTS: {
    CARDS: '/api/cards',
    CARD_BY_ID: (id: number) => `/api/cards/${id}`,
  },
  
  // Error messages
  ERROR_MESSAGES: {
    FETCH_CARDS_FAILED: 'Failed to fetch cards',
    FETCH_CARD_FAILED: (id: number) => `Failed to fetch card with ID ${id}`,
    CREATE_CARD_FAILED: 'Failed to create card',
    UPDATE_CARD_FAILED: (id: number) => `Failed to update card with ID ${id}`,
    CARD_NOT_FOUND: 'Card not found',
  },
  
  // Status codes
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    NOT_FOUND: 404,
  },
} as const

/**
 * Available card background colors
 */
export const CARD_BACKGROUND_COLORS = [
  '#1E293B',
  '#0F172A', 
  '#3B0764',
  '#4B5563',
  '#1A1A40',
  '#2D3748',
  '#1F2937',
  '#3C366B',
  '#111827',
  '#2C5282',
] as const

/**
 * Default card properties for new cards
 */
export const DEFAULT_CARD_PROPERTIES = {
  BALANCE: 0,
  STATUS: 'active' as const,
} as const 