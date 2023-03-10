import { addUser, getBooks, getUsers, getLoginStatus } from "./services/Communication";
import { Routes, Route, useLocation } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { AnimatePresence } from 'framer-motion'
import Header from "./Header";
import LandingPage from "./LandingPage";
import Login from "./Login"
import SearchPage from "./SearchPage";
import Signup from "./Signup";
import MyPage from "./MyPage";
import "./App.css";
export const UserContext = createContext();
export const BooksContext = createContext();

const App = () => {
  
  
const [books, setBooks] = useState([]);
const [users, setUsers] = useState([]);
useEffect(() => {
  getBooks().then((data) => {setBooks(data)});
  getUsers().then((data) => {setUsers(data)});
  getLoginStatus().then((data) =>{setLoginStatus(data)})
}, []);

const addNewUser = (newUser) => {
  addUser(newUser).then(newUser => setUsers([newUser, ...users]));
}

const [currentForm, setCurrentForm] = useState('login');

const toggleForm = (formName) => {
  setCurrentForm(formName);
}

const location = useLocation();
const [loginStatus, setLoginStatus] = useState({})
// loginStatus contains the data of the logged in user

 return ( 
  <div className='App'>
    <UserContext.Provider value={{users: users,
                                  loginStatus: loginStatus,
                                  setLoginStatus: setLoginStatus,
                                  setUsers: setUsers}}>
        <BooksContext.Provider value={{books: books,
                                       setBooks: setBooks}} >
      <Header />
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/mypage" element={<MyPage/>} />
          <Route path="/login" element={ currentForm === "login" 
                                                      ? <Login onFormSwitch={toggleForm} /> 
                                                      : <Signup addNewUser={addNewUser} onFormSwitch={toggleForm} />
                                                    }/>
        </Routes>
      </AnimatePresence>
    </BooksContext.Provider>

    {/*This part is for testing only*/}
    </UserContext.Provider>
  </div>
)
}

export default App;





