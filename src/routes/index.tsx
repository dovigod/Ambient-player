import { BrowserRouter, Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import Landing from 'pages/Landing';
import { PlayerContextProvider as PlayerStore } from 'hooks/usePlayer';
import { BackgroundStore } from 'hooks/useBackground';
const Routing = () => {
	return (
		<HashRouter>
			<Routes>
				<Route
					path="/"
					element={
						<PlayerStore>
							<BackgroundStore>
								<Landing />
							</BackgroundStore>
						</PlayerStore>
					}
				/>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</HashRouter>
	);
};

export default Routing;
