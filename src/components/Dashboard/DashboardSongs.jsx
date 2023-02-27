import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoAdd, IoPause, IoPlay, IoTrash } from "react-icons/io5";
import { TiDelete } from 'react-icons/ti';
import { useStateValue } from '../../context/ApplicationContext/StateContext';
import { getAllSongs } from '../../api';
import { actionType } from '../../context/ApplicationContext/reducer';
import { SongCard } from '../Dashboard';

const DashboardSongs = () => {
  const [songSearchText, setSongSearchText] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { state, dispatch } = useStateValue();

  useEffect(() => {
    if (!state.allSongs) {
      getAllSongs()
        .then(songs => {
          dispatch({ type: actionType.SET_ALL_SONGS, allSongs: songs.data ?? [] });
        })
        .catch(error => console.log(error));
    }
  }, []);

  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>
      <div className='w-full flex justify-center items-center gap-20'>
        <NavLink to={"/dashboard/newSong"} className="flex items-center justify-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-500 hover:shadow-md cursor-pointer">
          <IoAdd />
        </NavLink>
        <input type='text' className={`w-52 px-4 py-2 border ${isInputFocused ? 'border-gray-500 shadow-md' : 'border-gray-300'} rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`} placeholder='Search here...' value={songSearchText} onChange={(e) => setSongSearchText(e.target.value)} onFocus={() => setIsInputFocused(true)} onBlur={() => setIsInputFocused(false)}/>
        <TiDelete className='text-3xl text-textColor cursor-pointer'/>
      </div>
      {/* Main container */}
      <div className='relative w-full my-4 p-4 border border-gray-300 rounded-md'>
        {/* The count */}
        <div className='absolute top-4 left-4'>
          <p className='text-xl font-bold'>
            <span className='text-sm font-semibold text-textColor'>Count: </span>{state.allSongs?.length ?? 0}
          </p>
        </div>
        <SongContainer songs={state.allSongs} />
      </div>
    </div>
  );
}

export const SongContainer = ({ songs }) => {
  return (
    <div className='w-full flex flex-wrap gap-3 items-center justify-evenly'>
      {songs?.map((song, i) => <SongCard key={song._id} data={song} index={i} />)}
    </div>
  );
};

export default DashboardSongs;