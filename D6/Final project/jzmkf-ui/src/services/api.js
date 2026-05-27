import axios from 'axios';

// This points directly to your Spring Boot API Gateway!
const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;