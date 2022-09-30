const endpoint = {
	getLocation: (city: string, limit?: number) =>
		`geo/1.0/direct?q=${city}&limit=${limit ?? 5}&appid=${process.env.REACT_APP_WEATHER_KEY}`
};

export default endpoint;
