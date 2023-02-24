import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from "../assets/img";
import { isActiveStyles, isNotActiveStyles } from '../utils/styles';
import { useStateValue } from '../context/StateContext';
import { getAuth } from 'firebase/auth';
import { app } from '../config/firebase.config';
import { motion } from 'framer-motion';

const Header = () => {
  const { state } = useStateValue();
  const firebaseAuth = getAuth(app);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const logOut = async () => {
    try {
      await firebaseAuth.signOut();
    } catch (error) {
      console.log(`Error sign-out: ${error}`);
    }
  }

  return (
    <header className='flex items-center w-full p-4 md:py-2 md:px-6'>
      <NavLink to={"/"}>
        <img src={Logo} alt="Logo" className='w-16' />
      </NavLink>

      <ul className='flex items-center justify-center ml-7'>
        <li className='mx-5 text-lg'><NavLink to={'/home'} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Home</NavLink></li>
        <li className='mx-5 text-lg'><NavLink to={'/musics'} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Music</NavLink></li>
        <li className='mx-5 text-lg'><NavLink to={'/premium'} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Premium</NavLink></li>
        <li className='mx-5 text-lg'><NavLink to={'/contact'} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Contact Us</NavLink></li>
      </ul>

      <div className='flex items-center ml-auto cursor-pointer gap-2 relative' onMouseEnter={() => setMenuIsOpen(true)} onMouseLeave={() => setMenuIsOpen(false)}>
        {state.user?.imageURL && <img src={state.user?.imageURL} className='w-12 min-w-[44px] object-cover rounded-full shadow-lg' alt='Image of user' referrerPolicy='no-referrer'/>}
        <div className='flex flex-col'>
          <p className='text-textColor text-lg hover:text-headingColor font-semibold'>{state.user?.name ?? 'User' }</p>
          <p className='flex items-center gap-2 text-xs text-gray-500 font-normal'>Premium Member.</p>
        </div>
        {menuIsOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className='absolute z-10 top-12 p-3 right-0 w-275 gap-2 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col'
          >
            <NavLink to={'/userProfile'}>
              <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>Profile</p>
            </NavLink>
            <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>My favorites</p>
            {state.user?.role === "admin" && (
              <>
                <hr />
                <NavLink to={'/dashboard/home'}>
                  <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out'>Dashboard</p>
                </NavLink>
              </>
            )}
            <hr />
            <p className='text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out' onClick={logOut}>Sign out</p>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;