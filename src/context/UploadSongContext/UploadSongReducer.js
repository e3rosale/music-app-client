import initialUploadSongState from "./UploadSongInitialState";

export const uploadSongActionType = {
  SET_SONG_NAME: 'SET_SONG_NAME',
  SET_ARTIST_DROP_DOWN_SELECTION: 'SET_ARTIST_DROP_DOWN_SELECTION',
  SET_ALBUM_DROP_DOWN_SELECTION: 'SET_ALBUM_DROP_DOWN_SELECTION',
  SET_LANGUAGE_DROP_DOWN_SELECTION: 'SET_LANGUAGE_DROP_DOWN_SELECTION',
  SET_CATEGORY_DROP_DOWN_SELECTION: 'SET_CATEGORY_DROP_DOWN_SELECTION',
  CLEAR_ALL_SONG_FIELDS: 'CLEAR_ALL_SONG_FIELDS',
  SET_SONG_DOCUMENT_CREATION_IN_PROGRESS: 'SET_SONG_DOCUMENT_CREATION_IN_PROGRESS',
  SET_SONG_IMAGE_FILE_STORAGE_TRANSACTION_IN_PROGRESS: 'SET_SONG_IMAGE_FILE_STORAGE_TRANSACTION_IN_PROGRESS',
  SET_SONG_IMAGE_FILE_STORAGE_TRANSACTION_PROGRESS: 'SET_SONG_IMAGE_FILE_STORAGE_TRANSACTION_PROGRESS',
  SET_SONG_IMAGE_UPLOAD_URL: 'SET_SONG_IMAGE_UPLOAD_URL',
  SET_SONG_AUDIO_FILE_STORAGE_TRANSACTION_IN_PROGRESS: 'SET_SONG_AUDIO_FILE_STORAGE_TRANSACTION_IN_PROGRESS',
  SET_SONG_AUDIO_FILE_STORAGE_TRANSACTION_PROGRESS: 'SET_SONG_AUDIO_FILE_STORAGE_TRANSACTION_PROGRESS',
  SET_SONG_AUDIO_UPLOAD_URL: 'SET_SONG_AUDIO_UPLOAD_URL',
};

const uploadSongReducer = (state, action) => {
  console.log(action);

  switch(action.type) {
    case uploadSongActionType.SET_SONG_NAME:
      return {
        ...state,
        songName: action.songName
      };
    case uploadSongActionType.SET_ARTIST_DROP_DOWN_SELECTION:
      return {
        ...state,
        artistDropDownSelection: action.filterValue,
      };
    case uploadSongActionType.SET_ALBUM_DROP_DOWN_SELECTION:
      return {
        ...state,
        albumDropDownSelection: action.filterValue,
      };
    case uploadSongActionType.SET_LANGUAGE_DROP_DOWN_SELECTION:
      return {
        ...state,
        languageDropDownSelection: action.filterValue,
      };
    case uploadSongActionType.SET_CATEGORY_DROP_DOWN_SELECTION:
      return {
        ...state,
        categoryDropDownSelection: action.filterValue,
      };
    case uploadSongActionType.SET_SONG_IMAGE_FILE_STORAGE_TRANSACTION_IN_PROGRESS:
      return {
        ...state,
        songImageFileStorageTransactionInProgress: action.songImageFileStorageTransactionInProgress
      };
    case uploadSongActionType.SET_SONG_IMAGE_FILE_STORAGE_TRANSACTION_PROGRESS:
      return {
        ...state,
        songImageFileStorageTransactionProgress: action.songImageFileStorageTransactionProgress,
      };
    case uploadSongActionType.SET_SONG_IMAGE_UPLOAD_URL:
      return {
        ...state,
        songImageUploadURL: action.songImageUploadURL
      }
    case uploadSongActionType.SET_SONG_AUDIO_FILE_STORAGE_TRANSACTION_IN_PROGRESS:
      return {
        ...state,
        songAudioFileStorageTransactionInProgress: action.songAudioFileStorageTransactionInProgress
      };
    case uploadSongActionType.SET_SONG_AUDIO_FILE_STORAGE_TRANSACTION_PROGRESS:
      return {
        ...state,
        songAudioFileStorageTransactionProgress: action.songAudioFileStorageTransactionProgress
      }
    case uploadSongActionType.SET_SONG_AUDIO_UPLOAD_URL:
      return {
        ...state,
        songAudioUploadURL: action.songAudioUploadURL
      }
    case uploadSongActionType.SET_SONG_DOCUMENT_CREATION_IN_PROGRESS:
      return {
        ...state,
        songDocumentCreationInProgress: action.songDocumentCreationInProgress,
      }
    case uploadSongActionType.CLEAR_ALL_SONG_FIELDS:
      return {
        ...initialUploadSongState
      }
    default:
      throw new Error('Unknown action: ' + action.type);
  }
}

export default uploadSongReducer;