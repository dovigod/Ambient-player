import axios from 'axios';
const AxiosClient = axios.create();

AxiosClient.defaults.baseURL = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/';

AxiosClient.defaults.headers = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
	'Cache-Control': 'no-cache'
};

AxiosClient.defaults.withCredentials = true;

// Response interceptor to remove the local storage user whenever server detects no userId is present in session
// AxiosClient.interceptors.response.use(
//   function (response) {
//     if (response.status === 219) {
//       // 219 indicates that the results was a success but the user is not logged in
//       localStorage.removeItem('user');
//     }

//     return response;
//   },
//   function (error) {
//     console.log(error);
//     if (error.response.status === 419) {
//       // 419 indicates that the endpoint requires the user to be logged in
//       localStorage.removeItem('user');
//     }
//     return Promise.reject(error);
//   }
// );

// All request will wait 5 seconds before timeout
AxiosClient.defaults.timeout = 5000;

export default AxiosClient;
