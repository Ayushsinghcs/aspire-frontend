import { setupWorker } from 'msw/browser'
import { handlers } from './api/cardApiHandlers'

/**
 * MSW worker for mocking API requests in the browser
 * Handles all card-related API endpoints during development
 */
export const worker = setupWorker(...handlers)

/**
 * Starts the MSW worker for API mocking
 * Should be called in development mode only
 */
export const startWorker = async (): Promise<void> => {
  if (import.meta.env.DEV) {
    try {
      await worker.start({
        onUnhandledRequest: 'bypass', // Ignore unhandled requests
      })
      console.log('MSW worker started successfully')
    } catch (error) {
      console.error('Failed to start MSW worker:', error)
    }
  }
}
