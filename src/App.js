import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Login, Home, Dashboard } from './components';
import { firebaseAuth } from './config/firebase.config';
import { AnimatePresence } from 'framer-motion';
import { validateUser } from './api';
import { useApplicationState } from './context/ApplicationContext/ApplicationStateContext';
import { actionType } from './context/ApplicationContext/ApplicationReducer';

const App = () => {
  const navigate = useNavigate();
  const [, applicationDispatch] = useApplicationState();
  const [auth, setAuth] = useState(window.localStorage.getItem("auth") === "true");
  
  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const data = await validateUser(token);
        setAuth(true);
        window.localStorage.setItem("auth", "true");
        applicationDispatch({ type: actionType.SET_USER, user: data.user });
      } else {
        setAuth(false);
        window.localStorage.setItem("auth", "false");
        applicationDispatch({ type: actionType.SET_USER, user: null });
        navigate("/login");
      }
    });
  }, []);
  
  return (
    <AnimatePresence mode='wait'>
      <div className='h-auto min-w-[680px] bg-primary flex justify-center items-center'>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path='/*' element={<Home />}/>
        <Route path='/dashboard/*' element={<Dashboard />}/>
      </Routes>
      </div>
    </AnimatePresence>
  );
}

export default App;