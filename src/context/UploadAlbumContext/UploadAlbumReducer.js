import initialUploadAlbumState from "./UploadAlbumInitialState";

export const uploadAlbumActionType = {
  SET_ALBUM_NAME: 'SET_ALBUM_NAME',
  SET_ALBUM_IMAGE_UPLOAD_URL: 'SET_ALBUM_IMAGE_UPLOAD_URL',
  SET_ALBUM_DOCUMENT_CREATION_IN_PROGRESS: 'SET_ALBUM_DOCUMENT_CREATION_IN_PROGRESS',
  SET_ALBUM_IMAGE_FILE_STORAGE_TRANSACTION_IN_PROGRESS: 'SET_ALBUM_IMAGE_FILE_STORAGE_TRANSACTION_IN_PROGRESS',
  SET_ALBUM_IMAGE_FILE_STORAGE_TRANSACTION_PROGRESS: 'SET_ALBUM_IMAGE_FILE_STORAGE_TRANSACTION_PROGRESS',
  CLEAR_ALL_ALBUM_FIELDS: 'CLEAR_ALL_ALBUM_FIELDS',
};

export const uploadAlbumReducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case uploadAlbumActionType.SET_ALBUM_NAME:
      return {
        ...state,
        albumName: action.albumName,
      }
    case uploadAlbumActionType.SET_ALBUM_IMAGE_UPLOAD_URL:
      return {
        ...state,
        albumImageUploadURL: action.albumImageUploadURL,
      }
    case uploadAlbumActionType.SET_ALBUM_DOCUMENT_CREATION_IN_PROGRESS:
      return {
        ...state,
        albumDocumentCreationInProgress: action.albumDocumentCreationInProgress,
      }
    case uploadAlbumActionType.SET_ALBUM_IMAGE_FILE_STORAGE_TRANSACTION_IN_PROGRESS:
      return {
        ...state,
        albumImageFileStorageTransactionInProgress: action.albumImageFileStorageTransactionInProgress,
      }
    case uploadAlbumActionType.SET_ALBUM_IMAGE_FILE_STORAGE_TRANSACTION_PROGRESS:
      return {
        ...state,
        albumImageFileStorageTransactionProgress: action.albumImageFileStorageTransactionProgress,
      }
    case uploadAlbumActionType.CLEAR_ALL_ALBUM_FIELDS:
      return {
        ...initialUploadAlbumState,
      };
    default:
      throw new Error('Unknown action: ' + action.type);
  }
};