import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/index.scss'
import Router from './routes/Router'

createRoot(document.getElementById('root') as HTMLDivElement).render(
	<StrictMode>
		<Router />
	</StrictMode>
)
