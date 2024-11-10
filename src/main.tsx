import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk'
import './index.css'
import App from './App.tsx'
;(async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: '67209a99b0d22a0850a4e048',
    context: {
      kind: 'multi',
      channel: {
        key: 'digital-web',
        name: 'Digital Web',
      },
    },
  })

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <LDProvider>
        <App />
      </LDProvider>
    </StrictMode>
  )
})()
