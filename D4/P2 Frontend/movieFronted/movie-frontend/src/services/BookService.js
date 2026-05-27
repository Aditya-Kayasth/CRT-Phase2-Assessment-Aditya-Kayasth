import axios from 'axios';
const API_URL =
'http://localhost:8080/api/v1/books';
class BookService {
getAll(){
return axios.get(API_URL);
}
create(data){
return axios.post(API_URL, data);
}
delete(id){
return axios.delete(API_URL + '/' + id);
}
}
export default new BookService();