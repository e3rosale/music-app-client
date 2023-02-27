import React, { useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { GiLoveSong, GiMusicalNotes } from 'react-icons/gi';
import { RiUserStarFill } from 'react-icons/ri';
import { getAllUsers, getAllArtists, getAllAlbums, getAllSongs } from '../../api';
import { actionType } from '../../context/ApplicationContext/ApplicationReducer';
import { useApplicationState } from '../../context/ApplicationContext/ApplicationStateContext';
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
  const [{ allUsers, allArtists, allAlbums, allSongs }, applicationDispatch] = useApplicationState();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers()
        .then(users => {
          applicationDispatch({ type: actionType.SET_ALL_USERS, allUsers: users.data ?? [] });
        })
        .catch(error => console.log(error));
    }

    if (!allArtists) {
      getAllArtists()
        .then(artists => {
          applicationDispatch({ type: actionType.SET_ALL_ARTISTS, allArtists: artists.data ?? [] });
        })
        .catch(error => console.log(error));
    }

    if (!allAlbums) {
      getAllAlbums()
        .then(albums => {
          applicationDispatch({ type: actionType.SET_ALL_ALBUMS, allAlbums: albums.data ?? [] });
        })
        .catch(error => console.log(error));
    }

    if (!allSongs) {
      getAllSongs()
        .then(songs => {
          applicationDispatch({ type: actionType.SET_ALL_SONGS, allSongs: songs.data ?? [] });
        })
        .catch(error => console.log(error));
    }
  }, []);

  return (
    <div className='w-full p-6 flex items-center justify-evenly flex-wrap'>
      <DashboardCard icon={<FaUser className='text-3xl text-textColor'/>} name={"Users"} count={allUsers?.length ?? 0}/>
      <DashboardCard icon={<GiLoveSong className='text-3xl text-textColor'/>} name={"Songs"} count={allSongs?.length ?? 0}/>
      <DashboardCard icon={<RiUserStarFill className="text-3xl text-textColor"/>} name={"Artists"} count={allArtists?.length ?? 0}/>
      <DashboardCard icon={<GiMusicalNotes className='text-3xl text-textColor'/>} name={"Albums"} count={allAlbums?.length ?? 0}/>
    </div>
  );
}

export default DashboardHome;