import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider } from 'antd'
import { config } from './core/config/antdConfig.ts'
import { Provider } from 'react-redux'
import { store } from './core/store'
import { fetchCards } from './core/store/cardSlice'

import { startWorker } from './core/browser'

// Start MSW worker and initialize app
const initializeApp = async () => {
  // Start MSW worker first
  await startWorker()
  
  // Preload cards data immediately after worker is ready
  store.dispatch(fetchCards())
  
  const container = document.getElementById('root')
  if (!container) throw new Error('Root container not found')

  createRoot(container).render(
    <StrictMode>
      <Provider store={store}>
        <StyleProvider layer>
          <ConfigProvider theme={config}>
            <App />
          </ConfigProvider>
        </StyleProvider>
      </Provider>
    </StrictMode>
  )
}

// Initialize the app
initializeApp().catch(console.error)
