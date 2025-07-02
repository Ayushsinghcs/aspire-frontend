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

// Start MSW worker only in development
startWorker().then(() => {
  const container = document.getElementById('root')
  if (!container) throw new Error('Root container not found')

  // Initialize cards on app start
  store.dispatch(fetchCards())

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
})
