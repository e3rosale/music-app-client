import axios from 'axios';

const baseURL = 'http://localhost:4000/';

export const validateUser = async (token) => {
  try {
    const res = await axios.get(`${baseURL}api/users/login`, {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}api/users/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllArtists = async () => {
  try {
    const res = await axios.get(`${baseURL}api/artist/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllAlbums = async () => {
  try {
    const res = await axios.get(`${baseURL}api/album/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllSongs = async () => {
  try {
    const res = await axios.get(`${baseURL}api/song/getAll`);
    return res.data;
  } catch (error) {
    return null;
  }
}

export const changeUserRole = async (userId, role) => {
  try {
    const res = await axios.put(`${baseURL}api/users/updateRole/${userId}`, { role: role });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const deleteUser = async (userId) => {
  try {
    const res = await axios.delete(`${baseURL}api/users/deleteUser/${userId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const uploadSong = async (newSong) => {
  try {
    const res = await axios.post(`${baseURL}api/song/save`, { ...newSong });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSong = async (songId) => {
  try {
    const res = await axios.delete(`${baseURL}api/song/delete/${songId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const uploadArtist = async (newArtist) => {
  try {
    const res = await axios.post(`${baseURL}api/artist/save`, { ...newArtist });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export const uploadAlbum = async (newAlbum) => {
  try {
    const res = await axios.post(`${baseURL}api/album/save`, { ...newAlbum });
    return res.data;
  } catch (error) {
    throw error;
  }
}