export const actionType = {
  SET_USER: 'SET_USER',
  SET_ALL_USERS: 'SET_ALL_USERS',
  SET_ALL_SONGS: 'SET_ALL_SONGS',
  SET_ALL_ARTISTS: 'SET_ALL_ARTISTS',
  SET_ALL_ALBUMS: 'SET_ALL_ALBUMS',
  SET_ARTIST_DROP_DOWN_SELECTION: 'SET_ARTIST_DROP_DOWN_SELECTION',
  SET_ALBUM_DROP_DOWN_SELECTION: 'SET_ALBUM_DROP_DOWN_SELECTION',
  SET_LANGUAGE_DROP_DOWN_SELECTION: 'SET_LANGUAGE_DROP_DOWN_SELECTION',
  SET_CATEGORY_DROP_DOWN_SELECTION: 'SET_CATEGORY_DROP_DOWN_SELECTION',
  CLEAR_ALL_DROP_DOWN_SELECTIONS: 'CLEAR_ALL_DROP_DOWN_SELECTIONS',
};

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionType.SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.allUsers,
      };
    case actionType.SET_ALL_SONGS:
      return {
        ...state,
        allSongs: action.allSongs,
      };
    case actionType.SET_ALL_ARTISTS:
      return {
        ...state,
        allArtists: action.allArtists,
      }
    case actionType.SET_ALL_ALBUMS:
      return {
        ...state,
        allAlbums: action.allAlbums,
      }
    case actionType.SET_ARTIST_DROP_DOWN_SELECTION:
      return {
        ...state,
        artistDropDownSelection: action.filterValue,
      }
    case actionType.SET_ALBUM_DROP_DOWN_SELECTION:
      return {
        ...state,
        albumDropDownSelection: action.filterValue,
      }
    case actionType.SET_LANGUAGE_DROP_DOWN_SELECTION:
      return {
        ...state,
        languageDropDownSelection: action.filterValue,
      }
    case actionType.SET_CATEGORY_DROP_DOWN_SELECTION:
      return {
        ...state,
        categoryDropDownSelection: action.filterValue,
      }
    case actionType.CLEAR_ALL_DROP_DOWN_SELECTIONS:
      return {
        ...state,
        artistDropDownSelection: null,
        albumDropDownSelection: null,
        languageDropDownSelection: null,
        categoryDropDownSelection: null,
      }
    default:
      throw Error('Unknown action: ' + action.type);
  }
};

export default reducer;