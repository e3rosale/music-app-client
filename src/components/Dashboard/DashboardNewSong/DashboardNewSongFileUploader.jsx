import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { BiCloudUpload } from 'react-icons/bi';
import { storage } from '../../../config/firebase.config';
import { uploadAlbumActionType } from '../../../context/UploadAlbumContext/UploadAlbumReducer';
import { useUploadAlbumState } from '../../../context/UploadAlbumContext/UploadAlbumStateContext';
import { uploadArtistActionType } from '../../../context/UploadArtistContext/UploadArtistReducer';
import { useUploadArtistState } from '../../../context/UploadArtistContext/UploadArtistStateContext';
import { uploadSongActionType } from '../../../context/UploadSongContext/UploadSongReducer';
import { useUploadSongState } from '../../../context/UploadSongContext/UploadSongStateContext';

export const fileUploaderTypes = {
  SONG_IMAGE: "SONG_IMAGE",
  SONG_AUDIO: "SONG_AUDIO",
  ARTIST_IMAGE: "ARTIST_IMAGE",
  ALBUM_IMAGE: "ALBUM_IMAGE",
}

const FileUploader = ({ fileType }) => {
  const [{}, uploadSongDispatch] = useUploadSongState();
  const [{}, uploadArtistDispatch] = useUploadArtistState();
  const [{}, uploadAlbumDispatch] = useUploadAlbumState();

  let fileTypeText;
  let inputTypeAcceptAttributes;
  let storagePath;

  switch (fileType) {
    case fileUploaderTypes.SONG_IMAGE: {
      fileTypeText = 'a song cover image';
      inputTypeAcceptAttributes = 'image/*';
      storagePath = "Images/";
      break;
    }
    case fileUploaderTypes.SONG_AUDIO: {
      fileTypeText = 'an audio file';
      inputTypeAcceptAttributes = 'audio/*';
      storagePath = "Music/";
      break;
    }
    case fileUploaderTypes.ARTIST_IMAGE: {
      fileTypeText = 'an artist image';
      inputTypeAcceptAttributes = 'image/*';
      storagePath = "ArtistImages/"
      break;
    }
    case fileUploaderTypes.ALBUM_IMAGE: {
      fileTypeText = "an album image";
      inputTypeAcceptAttributes = 'image/*';
      storagePath = "AlbumImages/";
      break;
    }
  }

  const handleFileChange = (e) => {
    if (!e.target.files) {
      return;
    }

    const fileToUpload = e.target.files[0];

    if (fileType === fileUploaderTypes.SONG_IMAGE) {
      uploadSongDispatch({ type: uploadSongActionType.SET_IMAGE_FILE_IS_LOADING, imageFileIsLoading: true });
    }

    if (fileType === fileUploaderTypes.SONG_AUDIO) {
      uploadSongDispatch({ type: uploadSongActionType.SET_AUDIO_FILE_IS_LOADING, audioFileIsLoading: true });
    }

    if (fileType === fileUploaderTypes.ARTIST_IMAGE) {
      uploadArtistDispatch({ type: uploadArtistActionType.SET_ARTIST_IMAGE_FILE_STORAGE_TRANSACTION_IN_PROGRESS, artistImageFileStorageTransactionInProgress: true });
    }

    if (fileType === fileUploaderTypes.ALBUM_IMAGE) {
      uploadAlbumDispatch({ type: uploadAlbumActionType.SET_ALBUM_IMAGE_FILE_STORAGE_TRANSACTION_IN_PROGRESS, albumImageFileStorageTransactionInProgress: true });
    }

    const storageRef = ref(storage, storagePath + fileToUpload.name);
    const uploadTask = uploadBytesResumable(storageRef, fileToUpload);

    // Listen for state changes
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        if (fileType === fileUploaderTypes.SONG_IMAGE) {
          uploadSongDispatch({ type: uploadSongActionType.SET_IMAGE_FILE_LOADING_PROGRESS, imageFileLoadingProgress: progress });
        }

        if (fileType === fileUploaderTypes.SONG_AUDIO) {
          uploadSongDispatch({ type: uploadSongActionType.SET_AUDIO_FILE_LOADING_PROGRESS, audioFileLoadingProgress: progress });
        }

        if (fileType === fileUploaderTypes.ARTIST_IMAGE) {
          uploadArtistDispatch({ type: uploadArtistActionType.SET_ARTIST_IMAGE_FILE_STORAGE_TRANSACTION_PROGRESS, artistImageFileStorageTransactionProgress: progress });
        }

        if (fileType === fileUploaderTypes.ALBUM_IMAGE) {
          uploadAlbumDispatch({ type: uploadAlbumActionType.SET_ALBUM_IMAGE_FILE_STORAGE_TRANSACTION_PROGRESS, albumImageFileStorageTransactionProgress: progress });
        }
      }, 
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            console.log('User does not have permission to access the object');
            break;
          case 'storage/canceled':
            console.log('User canceled the upload');
            break;
          case 'storage/unknown':
            console.log('Unknown error occurred, inspect error.serverResponse');
            break;
        };
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            if (fileType === fileUploaderTypes.SONG_IMAGE) {
              uploadSongDispatch({ type: uploadSongActionType.SET_IMAGE_FILE_IS_LOADING, imageFileIsLoading: false });
              uploadSongDispatch({ type: uploadSongActionType.SET_IMAGE_FILE_URL, imageFileURL: downloadURL });
              uploadSongDispatch({ type: uploadSongActionType.SET_IMAGE_FILE_LOADING_PROGRESS, imageFileLoadingProgress: 0 });
            }
        
            if (fileType === fileUploaderTypes.SONG_AUDIO) {
              uploadSongDispatch({ type: uploadSongActionType.SET_AUDIO_FILE_IS_LOADING, audioFileIsLoading: false });
              uploadSongDispatch({ type: uploadSongActionType.SET_AUDIO_FILE_URL, audioFileURL: downloadURL });
              uploadSongDispatch({ type: uploadSongActionType.SET_AUDIO_FILE_LOADING_PROGRESS, audioFileLoadingProgress: 0 });
            }

            if (fileType === fileUploaderTypes.ARTIST_IMAGE) {
              uploadArtistDispatch({ type: uploadArtistActionType.SET_ARTIST_IMAGE_FILE_STORAGE_TRANSACTION_IN_PROGRESS, artistImageFileStorageTransactionInProgress: false });
              uploadArtistDispatch({ type: uploadArtistActionType.SET_ARTIST_IMAGE_UPLOAD_URL, artistImageUploadURL: downloadURL });
              uploadArtistDispatch({ type: uploadArtistActionType.SET_ARTIST_IMAGE_FILE_STORAGE_TRANSACTION_PROGRESS, artistImageFileStorageTransactionProgress: 0 });
            }

            if (fileType === fileUploaderTypes.ALBUM_IMAGE) {
              uploadAlbumDispatch({ type: uploadAlbumActionType.SET_ALBUM_IMAGE_FILE_STORAGE_TRANSACTION_IN_PROGRESS, albumImageFileStorageTransactionInProgress: false });
              uploadAlbumDispatch({ type: uploadAlbumActionType.SET_ALBUM_IMAGE_UPLOAD_URL, albumImageUploadURL: downloadURL });
              uploadAlbumDispatch({ type: uploadAlbumActionType.SET_ALBUM_IMAGE_FILE_STORAGE_TRANSACTION_PROGRESS, albumImageFileStorageTransactionProgress: 0 });
            }
          });
      }
    );
  };

  return (
    <label>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <p className="font-bold text-2xl">
            <BiCloudUpload />
          </p>
          <p className="text-lg">
            Click to upload {fileTypeText}
          </p>
        </div>
      </div>
      <input type="file" name="upload-file" accept={inputTypeAcceptAttributes} className="hidden" onChange={handleFileChange}/>
    </label>
  );
}

export default FileUploader;