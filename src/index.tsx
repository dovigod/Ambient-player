import React from 'react';
import ReactDOM from 'react-dom/client';
import './reset.css';
import './style.scss';
import App from './App';
import { PlayerContextProvider as PlayerStore } from 'hooks/usePlayer';
import { BackgroundStore } from 'hooks/useBackground';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<PlayerStore>
			<BackgroundStore>
				<App />
			</BackgroundStore>
		</PlayerStore>
	</React.StrictMode>
);
