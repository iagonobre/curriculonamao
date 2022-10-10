import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apicnm.iagonobre.com',
});

export default api;