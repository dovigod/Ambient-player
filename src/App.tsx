
import { useEffect } from 'react';
import endPoint from 'routes/endPoint';
import Routes from 'routes/index';
import AxiosClient from 'utils/AxiosClient';


// depreacted for timeout
function App() {
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(res) => {
				const {
					coords: { latitude, longitude }
				} = res;
				AxiosClient.get(endPoint.getWeather, {
					params: {
						lon: longitude,
						lat: latitude
					}
				})
			},
			(err) => console.log(err)
		);
	}, []);
	return (
		<div className="App">
			<Routes />
		</div>
	);
}

export default App;
