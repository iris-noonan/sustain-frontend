// src/App.jsx

import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

//!--- Components
import NavBar from './components/NavBar/NavBar';


//!--- Pages 
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Landing from './pages/Landing/Landing';

import Products from './pages/Products/Products';
import ProductShow from './pages/ProductShow/ProductShow';
import ProductCreate from './pages/ProductCreate/ProductCreate';
import ProductUpdate from './pages/ProductUpdate/ProductUpdate';

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
          <>
            <Route path="/" element={<Products user={user} />} />
            <Route path="/products/:productId" element={<ProductShow user={user} />} />
            <Route path="/products/new" element={<ProductCreate />} />
            <Route path="/products/:productId/edit" element={<ProductUpdate />} />
          </>
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