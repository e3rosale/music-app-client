import React, { useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { GiLoveSong, GiMusicalNotes } from 'react-icons/gi';
import { RiUserStarFill } from 'react-icons/ri';
import { getAllUsers, getAllArtists, getAllAlbums, getAllSongs } from '../../api';
import { actionType } from '../../context/ApplicationContext/reducer';
import { useStateValue } from '../../context/ApplicationContext/StateContext';
import { bgColors } from '../../utils/styles';

export const DashboardCard = ({icon, name, count}) => {
  const bg_Color = bgColors[parseInt(Math.random() * bgColors.length)];

  return (
    <div style={{background: `${bg_Color}`}} className='p-4 w-40 gap-3 h-auto rounded-lg shadow-md flex flex-col items-center'>
      {icon}
      <p className='text-xl text-textColor font-semibold'>{name}</p>
      <p className='text-xl text-textColor'>{count}</p>
    </div>
  );
}

const DashboardHome = () => {
  const { state, dispatch } = useStateValue();

  useEffect(() => {
    if (!state.allUsers) {
      getAllUsers()
        .then(users => {
          dispatch({ type: actionType.SET_ALL_USERS, allUsers: users.data ?? [] });
        })
        .catch(error => console.log(error));
    }

    if (!state.allArtists) {
      getAllArtists()
        .then(artists => {
          dispatch({ type: actionType.SET_ALL_ARTISTS, allArtists: artists.data ?? [] });
        })
        .catch(error => console.log(error));
    }

    if (!state.allAlbums) {
      getAllAlbums()
        .then(albums => {
          dispatch({ type: actionType.SET_ALL_ALBUMS, allAlbums: albums.data ?? [] });
        })
        .catch(error => console.log(error));
    }

    if (!state.allSongs) {
      getAllSongs()
        .then(songs => {
          dispatch({ type: actionType.SET_ALL_SONGS, allSongs: songs.data ?? [] });
        })
        .catch(error => console.log(error));
    }
  }, []);

  return (
    <div className='w-full p-6 flex items-center justify-evenly flex-wrap'>
      <DashboardCard icon={<FaUser className='text-3xl text-textColor'/>} name={"Users"} count={state.allUsers?.length ?? 0}/>
      <DashboardCard icon={<GiLoveSong className='text-3xl text-textColor'/>} name={"Songs"} count={state.allSongs?.length ?? 0}/>
      <DashboardCard icon={<RiUserStarFill className="text-3xl text-textColor"/>} name={"Artists"} count={state.allArtists?.length ?? 0}/>
      <DashboardCard icon={<GiMusicalNotes className='text-3xl text-textColor'/>} name={"Albums"} count={state.allAlbums?.length ?? 0}/>
    </div>
  );
}

export default DashboardHome;