# Core Module Documentation

This directory contains the core functionality of the application, organized for better maintainability, testability, and understandability.

## 📁 Directory Structure

```
src/core/
├── api/                    # API-related functionality
│   ├── cardService.ts     # Card API service layer
│   └── cardApiHandlers.ts # MSW mock API handlers
├── config/                # Configuration files
│   └── antdConfig.ts     # Ant Design theme configuration
├── constants/             # Application constants
│   └── cardConstants.ts  # Card-related constants
├── data/                  # Static data and initial state
│   └── initialCards.ts   # Initial card data
├── services/              # Business logic services
│   └── cardStorageService.ts # Card storage operations
├── store/                 # Redux store configuration
│   ├── constants/         # Redux action type constants
│   │   └── cardActionTypes.ts
│   ├── types/            # TypeScript type definitions
│   │   └── cardTypes.ts
│   ├── cardSlice.ts      # Redux card slice
│   ├── hooks.ts          # Typed Redux hooks
│   └── index.ts          # Store configuration
├── utils/                 # Utility functions
│   └── cardUtils.ts      # Card-related utility functions
├── browser.ts            # MSW browser setup
└── README.md             # This documentation
```

## 🏗️ Architecture Overview

### Separation of Concerns

The core module follows a clean architecture pattern with clear separation of concerns:

1. **API Layer** (`api/`) - Handles external API communication
2. **Services Layer** (`services/`) - Contains business logic
3. **Store Layer** (`store/`) - Manages application state
4. **Utilities** (`utils/`) - Reusable helper functions
5. **Constants** (`constants/`) - Centralized configuration values
6. **Data** (`data/`) - Static data and initial state

### Key Improvements

#### 1. **Constants Management**
- All magic numbers and strings are now centralized in `constants/cardConstants.ts`
- Easy to maintain and update application-wide values
- Prevents typos and improves consistency

#### 2. **Utility Functions**
- Card generation and storage logic extracted to `utils/cardUtils.ts`
- Pure functions that are easy to test and reuse
- Clear function documentation with JSDoc

#### 3. **Service Layer**
- `CardStorageService` provides a clean interface for storage operations
- Encapsulates localStorage logic with proper error handling
- Makes the code more testable and maintainable

#### 4. **Type Safety**
- Dedicated type definitions in `store/types/cardTypes.ts`
- Better TypeScript support throughout the application
- Clear interfaces for all data structures

#### 5. **Redux Organization**
- Action type constants prevent typos
- Better error handling in async thunks
- Improved documentation for all reducers and actions

## 🔧 Usage Examples

### Using the Card Service

```typescript
import { cardService } from '@/core/api/cardService'

// Fetch all cards
const cards = await cardService.getCards()

// Create a new card
const newCard = await cardService.createCard({ name: 'John Doe' })

// Update a card
const updatedCard = await cardService.updateCard(1, { balance: 1000 })
```

### Using Redux Store

```typescript
import { useAppDispatch, useAppSelector } from '@/core/store/hooks'
import { fetchCards, addCard } from '@/core/store/cardSlice'

// In a component
const dispatch = useAppDispatch()
const { cards, loading, error } = useAppSelector(state => state.card)

// Fetch cards
useEffect(() => {
  dispatch(fetchCards())
}, [dispatch])

// Add a new card
const handleAddCard = (name: string) => {
  dispatch(addCard(name))
}
```

### Using Utility Functions

```typescript
import { 
  generateRandomCardNumber, 
  generateRandomExpiry,
  createNewCard 
} from '@/core/utils/cardUtils'

// Generate card properties
const cardNumber = generateRandomCardNumber() // "4111 1111 1111 1111"
const expiry = generateRandomExpiry() // "12/25"

// Create a complete card
const newCard = createNewCard({ name: 'Jane Doe' }, existingCards)
```

## 🧪 Testing

The new structure makes testing much easier:

```typescript
// Test utility functions
import { generateRandomCardNumber } from '@/core/utils/cardUtils'

describe('generateRandomCardNumber', () => {
  it('should generate a valid card number', () => {
    const cardNumber = generateRandomCardNumber()
    expect(cardNumber).toMatch(/^4\d{3} \d{4} \d{4} \d{4}$/)
  })
})

// Test services
import { CardStorageService } from '@/core/services/cardStorageService'

describe('CardStorageService', () => {
  it('should initialize with default data', () => {
    CardStorageService.initialize()
    const cards = CardStorageService.getAllCards()
    expect(cards.length).toBeGreaterThan(0)
  })
})
```

## 🔄 Migration Guide

If you're updating from the old structure:

1. **Update imports** - All imports now use the new organized structure
2. **Use constants** - Replace magic strings with constants from `cardConstants.ts`
3. **Use typed hooks** - Replace `useDispatch` and `useSelector` with `useAppDispatch` and `useAppSelector`
4. **Use services** - Use `CardStorageService` for storage operations instead of direct localStorage calls

## 📝 Best Practices

1. **Always use constants** - Never hardcode values, use the constants from `cardConstants.ts`
2. **Use typed hooks** - Always use the typed Redux hooks for better TypeScript support
3. **Handle errors properly** - All async operations include proper error handling
4. **Document functions** - All public functions include JSDoc documentation
5. **Test utilities** - Utility functions are pure and easy to test

## 🚀 Future Enhancements

The new structure makes it easy to add new features:

1. **Add new API endpoints** - Extend `cardService.ts` with new methods
2. **Add new Redux actions** - Use the action type constants pattern
3. **Add new utilities** - Create new files in the `utils/` directory
4. **Add new services** - Create new service classes in the `services/` directory

This organization provides a solid foundation for scaling the application while maintaining code quality and developer experience. 