import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {DndContext} from '@dnd-kit/core'
import {AppThemeProvider} from './theme/AppThemeProvider.tsx'
import {NavigationProvider} from './navigation/NavigationProvider.tsx'
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <NavigationProvider>
          <DndContext>
            <App />
          </DndContext>
        </NavigationProvider>
      </AppThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
