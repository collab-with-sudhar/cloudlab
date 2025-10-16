import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react'

const client="CkyiDso9KZtaM0geyLwKKoyv3KCUr7pV";
const domain="dev-urmuuubycjmzdlkf.us.auth0.com";
createRoot(document.getElementById('root')).render(
  <Auth0Provider
  
  clientId={client} domain={domain} authorizationParams={{redirect_uri:window.location.origin}}>
      <StrictMode>
        <App />
      </StrictMode>
  </Auth0Provider>
)
