import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppWrapper from './components/AppWrapper'
import '../node_modules/reactive-bulma/dist/assets/reactive-bulma.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
)
