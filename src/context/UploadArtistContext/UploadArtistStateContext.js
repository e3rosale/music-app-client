import { createContext, useContext, useReducer } from "react";
import initialUploadArtistState from "./UploadArtistInitialState";
import { uploadArtistReducer } from "./UploadArtistReducer";

const UploadArtistContext = createContext();

export const UploadArtistStateProvider = ({ children }) => {
  return (
    <UploadArtistContext.Provider value={useReducer(uploadArtistReducer, initialUploadArtistState)}>
      {children}
    </UploadArtistContext.Provider>
  );
}

export const useUploadArtistState = () => {
  const uploadArtistContext = useContext(UploadArtistContext);

  if (uploadArtistContext === undefined) {
    throw new Error('useUploadArtistState must be used within an UploadArtistStateProvider.');
  }

  return uploadArtistContext;
}