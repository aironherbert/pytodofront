import axios from 'axios';

let path = "https://AironH.pythonanywhere.com"

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    path = "http://localhost:8000"
}
class TodoDataService {
    getAll(token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.get(`${path}/api/todos/`);
    }
    createTodo(data, token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.post(`${path}/api/todos/`, data);
    }
    updateTodo(id, data, token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${path}/api/todos/${id}`, data);
    }
    deleteTodo(id, token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.delete(`${path}/api/todos/${id}`);
    }
    completeTodo(id, token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
        return axios.put(`${path}/api/todos/${id}/complete`);
    }
    login(data) {
        return axios.post(`${path}/api/login/`, data);
    }
    signup(data) {
        return axios.post(`${path}/api/signup/`, data);
    }
}
export default new TodoDataService();