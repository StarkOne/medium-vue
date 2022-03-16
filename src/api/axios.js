import axios from 'axios';
import { getItem } from '@/helpers/persostanceStorage';

axios.defaults.baseURL = 'https://conduit.productionready.io/api';

axios.interceptors.request.use((config) => {
    const token = getItem('accessToken');
    const authorization = token ? `Token ${token}` : null;
    config.headers.authorization = authorization;
    return config;
});

export default axios;
