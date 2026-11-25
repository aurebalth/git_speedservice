import React from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'

// Remove the SEO snapshot after the initial HTML has been parsed. React Helmet
// then owns the live metadata while client-side navigation changes routes.
document.head.querySelectorAll('[data-seo-prerender="true"]').forEach((element) => element.remove());

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)