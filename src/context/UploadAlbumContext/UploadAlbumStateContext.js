import { createContext, useContext, useReducer } from "react";
import initialUploadAlbumState from "./UploadAlbumInitialState";
import { uploadAlbumReducer } from "./UploadAlbumReducer";

const UploadAlbumContext = createContext();

export const UploadAlbumStateProvider = ({ children }) => {
  return (
    <UploadAlbumContext.Provider value={useReducer(uploadAlbumReducer, initialUploadAlbumState)}>
      {children}
    </UploadAlbumContext.Provider>
  );
};

export const useUploadAlbumState = () => {
  const uploadAlbumContext = useContext(UploadAlbumContext);

  if (uploadAlbumContext === undefined) {
    throw new Error('useUploadAlbumState must be used within an UploadAlbumStateProvider.');
  }

  return uploadAlbumContext;
}