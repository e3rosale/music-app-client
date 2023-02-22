import initialUploadSongState from "./UploadSongInitialState";

export const uploadSongActionType = {
  SET_SONG_NAME: 'SET_SONG_NAME',
  SET_ARTIST_DROP_DOWN_SELECTION: 'SET_ARTIST_DROP_DOWN_SELECTION',
  SET_ALBUM_DROP_DOWN_SELECTION: 'SET_ALBUM_DROP_DOWN_SELECTION',
  SET_LANGUAGE_DROP_DOWN_SELECTION: 'SET_LANGUAGE_DROP_DOWN_SELECTION',
  SET_CATEGORY_DROP_DOWN_SELECTION: 'SET_CATEGORY_DROP_DOWN_SELECTION',
  CLEAR_ALL_SONG_FIELDS: 'CLEAR_ALL_SONG_FIELDS',
  SET_IMAGE_FILE_IS_LOADING: 'SET_IMAGE_FILE_IS_LOADING',
  SET_IMAGE_FILE_LOADING_PROGRESS: 'SET_IMAGE_FILE_LOADING_PROGRESS',
  SET_IMAGE_FILE_URL: 'SET_IMAGE_FILE_URL',
  SET_AUDIO_FILE_IS_LOADING: 'SET_AUDIO_FILE_IS_LOADING',
  SET_AUDIO_FILE_LOADING_PROGRESS: 'SET_AUDIO_FILE_LOADING_PROGRESS',
  SET_AUDIO_FILE_URL: 'SET_AUDIO_FILE_URL',
};

const uploadSongReducer = (state, action) => {
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
    case uploadSongActionType.SET_IMAGE_FILE_IS_LOADING:
      return {
        ...state,
        imageFileIsLoading: action.imageFileIsLoading
      };
    case uploadSongActionType.SET_IMAGE_FILE_LOADING_PROGRESS:
      return {
        ...state,
        imageFileLoadingProgress: action.imageFileLoadingProgress,
      };
    case uploadSongActionType.SET_IMAGE_FILE_URL:
      return {
        ...state,
        imageFileURL: action.imageFileURL
      }
    case uploadSongActionType.SET_AUDIO_FILE_IS_LOADING:
      return {
        ...state,
        audioFileIsLoading: action.audioFileIsLoading
      };
    case uploadSongActionType.SET_AUDIO_FILE_LOADING_PROGRESS:
      return {
        ...state,
        audioFileLoadingProgress: action.audioFileLoadingProgress
      }
    case uploadSongActionType.SET_AUDIO_FILE_URL:
      return {
        ...state,
        audioFileURL: action.audioFileURL
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