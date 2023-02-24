export const uploadArtistActionType = {
  SET_ARTIST_NAME: 'SET_ARTIST_NAME',
  SET_ARTIST_TWITTER: 'SET_ARTIST_TWITTER',
  SET_ARTIST_INSTAGRAM: 'SET_ARTIST_INSTAGRAM',
  SET_ARTIST_IMAGE_UPLOAD_URL: 'SET_ARTIST_IMAGE_UPLOAD_URL',
  SET_ARTIST_DOCUMENT_CREATION_IN_PROGRESS: 'SET_ARTIST_DOCUMENT_CREATION_IN_PROGRESS',
  SET_ARTIST_IMAGE_FILE_IS_SAVING_IN_STORAGE: 'SET_ARTIST_IMAGE_FILE_IS_SAVING_IN_STORAGE',
  SET_ARTIST_IMAGE_FILE_SAVING_PROGRESS: 'SET_ARTIST_IMAGE_FILE_SAVING_PROGRESS',
};

export const uploadArtistReducer = (state, action) => {
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
    case uploadArtistActionType.SET_ARTIST_IMAGE_FILE_IS_SAVING_IN_STORAGE:
      return {
        ...state,
        artistImageFileIsSavingInStorage: action.artistImageFileIsSavingInStorage,
      }
    case uploadArtistActionType.SET_ARTIST_IMAGE_FILE_SAVING_PROGRESS:
      return {
        ...state,
        artistImageFileSavingProgress: action.artistImageFileSavingProgress
      };
    default:
      throw new Error('Unknown action: ' + action.type);
  }
};