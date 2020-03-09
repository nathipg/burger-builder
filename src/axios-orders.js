import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-db10f.firebaseio.com'
});

export default instance;