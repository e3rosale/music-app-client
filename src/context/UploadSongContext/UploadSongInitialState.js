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
  songAudioFileStorageTransactionInProgress: false,
  songAudioFileStorageTransactionProgress: 0,
  songAudioUploadURL: null,
  songDocumentCreationInProgress: null,
}

export default initialUploadSongState;