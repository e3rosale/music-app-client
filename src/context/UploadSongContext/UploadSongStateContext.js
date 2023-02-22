import React, { createContext, useContext, useReducer } from "react";
import initialUploadSongState from "./UploadSongInitialState";
import uploadSongReducer from "./UploadSongReducer";


const UploadSongContext = createContext();

export const UploadSongStateProvider = ({ children }) => {
  return (
    <UploadSongContext.Provider value={useReducer(uploadSongReducer, initialUploadSongState)}>
      {children}
    </UploadSongContext.Provider>
  )
};

export const useUploadSongState = () => {
  const uploadSongContext = useContext(UploadSongContext);

  if (uploadSongContext === undefined) {
    throw new Error('useUploadSong must be used within a UploadSongStateProvider');
  }

  return uploadSongContext;
}