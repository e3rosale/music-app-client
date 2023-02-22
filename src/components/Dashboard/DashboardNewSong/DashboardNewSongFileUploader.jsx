import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { BiCloudUpload } from 'react-icons/bi';
import { storage } from '../../../config/firebase.config';
import { uploadSongActionType } from '../../../context/UploadSongContext/UploadSongReducer';
import { useUploadSongState } from '../../../context/UploadSongContext/UploadSongStateContext';

const FileUploader = ({ fileType }) => {
  const [_, uploadSongDispatch] = useUploadSongState();
  let fileTypeText;
  let inputTypeAcceptAttributes;
  let storagePath;

  switch (fileType) {
    case "image": {
      fileTypeText = 'an image';
      inputTypeAcceptAttributes = 'image/*';
      storagePath = "Images/";
      break;
    }
    case "audio": {
      fileTypeText = 'audio';
      inputTypeAcceptAttributes = 'audio/*';
      storagePath = "Music/";
      break;
    }
  }

  const handleFileChange = (e) => {
    if (!e.target.files) {
      return;
    }

    const fileToUpload = e.target.files[0];

    if (fileType === "image") {
      uploadSongDispatch({ type: uploadSongActionType.SET_IMAGE_FILE_IS_LOADING, imageFileIsLoading: true });
    }

    if (fileType === "audio") {
      uploadSongDispatch({ type: uploadSongActionType.SET_AUDIO_FILE_IS_LOADING, audioFileIsLoading: true });
    }

    const storageRef = ref(storage, storagePath + fileToUpload.name);
    const uploadTask = uploadBytesResumable(storageRef, fileToUpload);

    // Listen for state changes
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        if (fileType === "image") {
          uploadSongDispatch({ type: uploadSongActionType.SET_IMAGE_FILE_LOADING_PROGRESS, imageFileLoadingProgress: progress });
        }

        if (fileType === "audio") {
          uploadSongDispatch({ type: uploadSongActionType.SET_AUDIO_FILE_LOADING_PROGRESS, audioFileLoadingProgress: progress });
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
            if (fileType === "image") {
              uploadSongDispatch({ type: uploadSongActionType.SET_IMAGE_FILE_IS_LOADING, imageFileIsLoading: false });
              uploadSongDispatch({ type: uploadSongActionType.SET_IMAGE_FILE_URL, imageFileURL: downloadURL });
              uploadSongDispatch({ type: uploadSongActionType.SET_IMAGE_FILE_LOADING_PROGRESS, imageFileLoadingProgress: 0 });
            }
        
            if (fileType === "audio") {
              uploadSongDispatch({ type: uploadSongActionType.SET_AUDIO_FILE_IS_LOADING, audioFileIsLoading: false });
              uploadSongDispatch({ type: uploadSongActionType.SET_AUDIO_FILE_URL, audioFileURL: downloadURL });
              uploadSongDispatch({ type: uploadSongActionType.SET_AUDIO_FILE_LOADING_PROGRESS, audioFileLoadingProgress: 0 });
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