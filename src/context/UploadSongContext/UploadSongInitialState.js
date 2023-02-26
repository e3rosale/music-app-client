const initialUploadSongState = {
  songName: null,
  artistDropDownSelection: null,
  albumDropDownSelection: null,
  languageDropDownSelection: null,
  categoryDropDownSelection: null,
  songTwitter: null,
  songInstagram: null,
  songImageFileStorageTransactionInProgress: false,
  songImageFileStorageTransactionProgress: 0,
  songImageUploadURL: null,
  audioFileIsLoading: false,
  audioFileLoadingProgress: 0,
  audioFileURL: null,
  songDocumentCreationInProgress: null,
}

export default initialUploadSongState;