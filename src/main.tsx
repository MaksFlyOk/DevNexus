import { store } from '@redux'
import '@styles/index.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import Router from './routes/Router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: 3000000
    }
  }
})

async function enableMocking() {
  if (import.meta.env.VITE_APP_IS_MOCKUP === 'false') {
    return
  }

  const { worker } = await import('./mocks/browser')

  return worker.start({
    serviceWorker: {
      url: `${import.meta.env.VITE_APP_BASE_URL || ''}/mockServiceWorker.js`
    }
  })
}

const rootElement = createRoot(
  document.getElementById('root') as HTMLDivElement
)

enableMocking().then(() => {
  rootElement.render(
    <StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </Provider>
    </StrictMode>
  )
})
