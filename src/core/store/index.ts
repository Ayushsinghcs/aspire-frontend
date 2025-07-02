import { configureStore } from '@reduxjs/toolkit'
import cardReducer from './cardSlice'

/**
 * Redux store configuration
 * Centralizes all application state management
 */
export const store = configureStore({
  reducer: {
    card: cardReducer,
  },
  // Enable Redux DevTools in development
  devTools: import.meta.env.DEV,
})

// Export types for use throughout the application
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 