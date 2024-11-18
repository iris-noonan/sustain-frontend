// src/App.jsx

import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './pages/Landing/Landing';
import Products from './pages/Products/Products';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';

import { getUser, removeToken } from './utils/auth'

const App = () => {
  const [user, setUser] = useState(getUser())

  const navigate = useNavigate()

  const handleSignOut = () => {
    removeToken()
    setUser(null)
    navigate('/signin')
  }

  return (
    <>
      <NavBar user={user} handleSignOut={handleSignOut}/>
      <Routes>
        { user ? (
          <Route path="/" element={<Products user={user} />} />
        ) : (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<SignIn setUser={setUser} />} />
            <Route path="/signup" element={<SignUp setUser={setUser} />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;