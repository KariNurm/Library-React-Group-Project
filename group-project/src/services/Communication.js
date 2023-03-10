import axios from 'axios';

const loginUrl = "http://localhost:3001/loginStatus";
const booksUrl = "http://localhost:3001/books";
const usersUrl = "http://localhost:3001/users";

// Get list of books
const getBooks = () => {
  return axios
            .get(booksUrl)
            .then((response) => response.data);
}

// Get current login status
const getLoginStatus = () => {
  return axios
            .get(loginUrl)
            .then((response) => response.data);
}
// Set current login status
const setLoginStatusServer = (status) => {
  return axios
            .put(loginUrl, status)
            .then(response => response.data);
}

// Get list of users
const getUsers = () => {
  return axios
            .get(usersUrl)
            .then((response) => response.data);
}

const addUser = (newUser) => {
  return axios
  .post(usersUrl, newUser)
  .then((response) => response.data);
}

const updateUser = (id,newStatus) => {
  return axios
            .put(`${usersUrl}/${id}`, newStatus)
            .then((response) => response.data);
}


const borrowBook = (id, newStatus) => {
  return axios
            .put(`${booksUrl}/${id}`, newStatus)
            .then(response => response.data)
} 
const returnBook = (id, newStatus) => {
  return axios
            .put(`${booksUrl}/${id}`, newStatus)
            .then(response => response.data)
} 
export {getBooks, borrowBook, returnBook, getUsers, getLoginStatus, updateUser, setLoginStatusServer, addUser};
