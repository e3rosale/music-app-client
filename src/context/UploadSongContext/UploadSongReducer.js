import initialUploadSongState from "./UploadSongInitialState";

export const uploadSongActionType = {
  SET_ARTIST_DROP_DOWN_SELECTION: 'SET_ARTIST_DROP_DOWN_SELECTION',
  SET_ALBUM_DROP_DOWN_SELECTION: 'SET_ALBUM_DROP_DOWN_SELECTION',
  SET_LANGUAGE_DROP_DOWN_SELECTION: 'SET_LANGUAGE_DROP_DOWN_SELECTION',
  SET_CATEGORY_DROP_DOWN_SELECTION: 'SET_CATEGORY_DROP_DOWN_SELECTION',
  CLEAR_ALL_SONG_FIELDS: 'CLEAR_ALL_SONG_FIELDS',
};

const uploadSongReducer = (state, action) => {
  switch(action.type) {
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
    case uploadSongActionType.CLEAR_ALL_SONG_FIELDS:
      return {
        ...initialUploadSongState
      }
    default:
      throw new Error('Unknown action: ' + action.type);
  }
}

export default uploadSongReducer;