import { addUser, getBooks, getUsers } from "./services/Communication";
import { Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import Header from "./Header";
import LandingPage from "./LandingPage";
import Login from "./Login"
import SearchPage from "./SearchPage";
import Signup from "./Signup";
import "./App.css";
export const UserContext = createContext();

const App = () => {
  
  
const [books, setBooks] = useState([]);
const [users, setUsers] = useState([]);

useEffect(() => {
  getBooks().then((data) => {setBooks(data)});
  getUsers().then((data) => {setUsers(data)});
}, []);

const addNewUser = (newUser) => {
  addUser(newUser).then(newUser => setUsers([newUser, ...users]));
}

const [currentForm, setCurrentForm] = useState('login');

const toggleForm = (formName) => {
  setCurrentForm(formName);
}


const [loginStatus, setLoginStatus] = useState({login: false,
                                                userId: null,
                                                admin: false })


 return ( 
  <div className='App'>
    <UserContext.Provider value={{users: users, setLoginStatus: setLoginStatus}}>
      <Header /> { /* <Link> elements goes to Header component*/ }
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchPage books={books}/>} />
        <Route path="/login" element={
          currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Signup  addNewUser={addNewUser} onFormSwitch={toggleForm} />} />
      </Routes>
    {loginStatus.login === true ? <p className="logStatus" style={{"color": "green"}}>Logged In</p>  
                          : <p className="logStatus" style={{"color": "red"}}>Logged out</p>}
    {console.log(loginStatus)}
    </UserContext.Provider>
  </div>
)
}

export default App;





