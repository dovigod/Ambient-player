import axios from 'axios';
const AxiosClient = axios.create();

AxiosClient.defaults.baseURL = 'http://localhost:3001/';

AxiosClient.defaults.headers = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
	'Cache-Control': 'no-cache'
};

AxiosClient.defaults.withCredentials = true;
AxiosClient.defaults.timeout = 15000;

export default AxiosClient;
