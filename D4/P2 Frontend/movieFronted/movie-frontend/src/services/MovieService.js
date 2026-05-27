import axios from 'axios';

// Base URL matches your Controller mapping
const API_URL = 'http://localhost:8080/api/movies/v1';

class MovieService {
    getAll() {
        return axios.get(API_URL + '/all');
    }
    create(data) {

        return axios.post(API_URL + '/add', data);
    }
    update(id, data) {

        return axios.put(API_URL + '/update/' + id, data);
    }
    delete(id) {
        return axios.delete(API_URL + '/delete/' + id);
    }
}

export default new MovieService();