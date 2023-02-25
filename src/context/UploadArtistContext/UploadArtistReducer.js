import initialUploadArtistState from "./UploadArtistInitialState";

export const uploadArtistActionType = {
  SET_ARTIST_NAME: 'SET_ARTIST_NAME',
  SET_ARTIST_TWITTER: 'SET_ARTIST_TWITTER',
  SET_ARTIST_INSTAGRAM: 'SET_ARTIST_INSTAGRAM',
  SET_ARTIST_IMAGE_UPLOAD_URL: 'SET_ARTIST_IMAGE_UPLOAD_URL',
  SET_ARTIST_DOCUMENT_CREATION_IN_PROGRESS: 'SET_ARTIST_DOCUMENT_CREATION_IN_PROGRESS',
  SET_ARTIST_IMAGE_FILE_STORAGE_TRANSACTION_IN_PROGRESS: 'SET_ARTIST_IMAGE_FILE_STORAGE_TRANSACTION_IN_PROGRESS',
  SET_ARTIST_IMAGE_FILE_STORAGE_TRANSACTION_PROGRESS: 'SET_ARTIST_IMAGE_FILE_STORAGE_TRANSACTION_PROGRESS',
  CLEAR_ALL_ARTIST_FIELDS: 'CLEAR_ALL_ARTIST_FIELDS',
};

export const uploadArtistReducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case uploadArtistActionType.SET_ARTIST_NAME:
      return {
        ...state,
        artistName: action.artistName
      };
    case uploadArtistActionType.SET_ARTIST_TWITTER:
      return {
        ...state,
        artistTwitter: action.artistTwitter
      };
    case uploadArtistActionType.SET_ARTIST_INSTAGRAM:
      return {
        ...state,
        artistInstagram: action.artistInstagram
      }
    case uploadArtistActionType.SET_ARTIST_IMAGE_UPLOAD_URL:
      return {
        ...state,
        artistImageUploadURL: action.artistImageUploadURL
      }
    case uploadArtistActionType.SET_ARTIST_DOCUMENT_CREATION_IN_PROGRESS:
      return {
        ...state,
        artistDocumentCreationInProgress: action.artistDocumentCreationInProgress,
      }
    case uploadArtistActionType.SET_ARTIST_IMAGE_FILE_STORAGE_TRANSACTION_IN_PROGRESS:
      return {
        ...state,
        artistImageFileStorageTransactionInProgress: action.artistImageFileStorageTransactionInProgress,
      }
    case uploadArtistActionType.SET_ARTIST_IMAGE_FILE_STORAGE_TRANSACTION_PROGRESS:
      return {
        ...state,
        artistImageFileStorageTransactionProgress: action.artistImageFileStorageTransactionProgress
      };
    case uploadArtistActionType.CLEAR_ALL_ARTIST_FIELDS:
      return {
        ...initialUploadArtistState,
      };
    default:
      throw new Error('Unknown action: ' + action.type);
  }
};