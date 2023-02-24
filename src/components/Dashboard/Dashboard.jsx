import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Header from '../Header';
import { IoHome } from 'react-icons/io5';
import { isActiveStyles, isNotActiveStyles } from '../../utils/styles';
import { DashboardHome, DashboardSongs, DashboardUsers, DashboardArtists, DashboardAlbums, DashboardNewSong } from './index';
import { UploadSongStateProvider } from '../../context/UploadSongContext/UploadSongStateContext';
import { UploadArtistStateProvider } from '../../context/UploadArtistContext/UploadArtistStateContext';

const Dashboard = () => {
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center bg-primary'>
      <Header />
      <div className='w-[60%] my-2 p-4 flex items-center justify-evenly'>
        <NavLink to={"/dashboard/home"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}><IoHome className='text-2xl text-textColor'/></NavLink>
        <NavLink to={"/dashboard/user"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Users</NavLink>
        <NavLink to={"/dashboard/songs"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Songs</NavLink>
        <NavLink to={"/dashboard/artist"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Artists</NavLink>
        <NavLink to={"/dashboard/albums"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Albums</NavLink>
      </div>
      <div className='my-4 w-full p-4'>
        <Routes>
          <Route path='/home' element={<DashboardHome />}></Route>
          <Route path='/user' element={<DashboardUsers />}></Route>
          <Route path='/songs' element={<DashboardSongs />}></Route>
          <Route path='/artist' element={<DashboardArtists />}></Route>
          <Route path='/albums' element={<DashboardAlbums />}></Route>
          <Route path='/newSong'
            element={
              <UploadSongStateProvider>
                <UploadArtistStateProvider>
                  <DashboardNewSong />
                </UploadArtistStateProvider>
              </UploadSongStateProvider>
            }>
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default Dashboard;