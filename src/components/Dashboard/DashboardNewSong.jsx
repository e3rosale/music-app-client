import React, { useState, useEffect } from "react";
import { useStateValue } from "../../context/StateContext";
import { filterByCategory, filterByLanguage } from "../../utils/supportFunctions";
import { FilterButtons } from "../Dashboard";
import { getAllAlbums, getAllArtists } from '../../api';
import { actionType } from "../../context/reducer";
import { BiCloudUpload } from "react-icons/bi";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebase.config";
import { MdDelete } from "react-icons/md";
import { motion } from 'framer-motion';

const DashboardNewSong = () => {
  const [songName, setSongName] = useState("");
  const { state, dispatch } = useStateValue();

  const [isSavingSong, setIsSavingSong] = useState(false);

  const [isImageLoading, setIsImageLoading] = useState(false);
  const [songImageUploadingStatus, setSongImageUploadingStatus] = useState(0);
  const [songImageUploadURL, setSongImageUploadURL] = useState(null);

  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [songAudioUploadingStatus, setSongAudioUploadingStatus] = useState(0);
  const [songAudioUploadURL, setSongAudioUploadURL] = useState(null);

  useEffect(() => {
    if (state.allArtists === null) {
      getAllArtists()
        .then(artists => {
          dispatch({ type: actionType.SET_ALL_ARTISTS, allArtists: artists.data });
        })
        .catch(error => console.log(error));
    }

    if (state.allAlbums === null) {
      getAllAlbums()
        .then(albums => {
          dispatch({ type: actionType.SET_ALL_ALBUMS, allAlbums: albums.data });
        })
        .catch(error => console.log(error));
    }

    return () => dispatch({ type: actionType.CLEAR_ALL_DROP_DOWN_SELECTIONS });
  }, []);

  const deleteUploadedFile = (uploadFileURL, setIsFileLoading, setFileUploadURL, setFileUploadingStatus) => {
    setIsFileLoading(true);
    setFileUploadingStatus(0);
    const targetFileRef = ref(storage, uploadFileURL);

    // delete the file
    deleteObject(targetFileRef)
      .then(() => {
        setIsFileLoading(false);
        setFileUploadURL(null);
      })
      .catch(error => console.log(error));
  }

  const saveSong = () => {
    console.log('saving song');
    setIsSavingSong(true);
  }

  const areAllSongFieldsPopulated = () => {
    return false;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-md gap-4">
      <input 
        type="text" 
        placeholder="Type your song name..." 
        className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
        value={songName}
        onChange={(e) => setSongName(e.target.value)}
      />
      <div className="flex w-full justify-between flex-wrap items-center gap-4">
        <FilterButtons filterData={state.allArtists} flag={"Artist"} />
        <FilterButtons filterData={state.allAlbums} flag={"Album"} />
        <FilterButtons filterData={filterByLanguage} flag={"Language"} />
        <FilterButtons filterData={filterByCategory} flag={"Category"} />
      </div>
      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isImageLoading && <FileLoader progress={songImageUploadingStatus} />}
        {!isImageLoading && (
          <>
            {songImageUploadURL ?
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img src={songImageUploadURL} className="w-full h-full object-cover" alt="song image upload"/>
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                  onClick={() => deleteUploadedFile(songImageUploadURL, setIsImageLoading, setSongImageUploadURL, setSongImageUploadingStatus)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div> : 
              <FileUploader fileType={"image"} setIsFileLoading={setIsImageLoading} setFileUploadingStatus={setSongImageUploadingStatus} setFileUploadURL={setSongImageUploadURL} />}
          </>
        )}
      </div>
      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {isAudioLoading && <FileLoader progress={songAudioUploadingStatus} />}
        {!isAudioLoading && (
          <>
            {songAudioUploadURL ? 
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-md">
                <audio controls src={songAudioUploadURL} />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                  onClick={() => deleteUploadedFile(songAudioUploadURL, setIsAudioLoading, setSongAudioUploadURL, setSongAudioUploadingStatus)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div> : 
              <FileUploader fileType={"audio"} setIsFileLoading={setIsAudioLoading} setFileUploadingStatus={setSongAudioUploadingStatus} setFileUploadURL={setSongAudioUploadURL}/>}
          </>
        )}
      </div>
      <div className="flex items-center justify-center w-60 p-4">
        {isSavingSong ? 
          (<DisabledButton/>)
          : 
          (<motion.button whileTap={{ scale: 0.75 }} className="px-8 py-2 w-full rounded-md text-white bg-red-600 hover:shadow-lg disabled:opacity-60" onClick={saveSong} disabled={!areAllSongFieldsPopulated()}>
            Save song
          </motion.button>)
        }
      </div>
    </div>
  )
};

const FileLoader = ({ progress }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p className="text-xl font-semibold text-textColor">{Math.round(progress) > 0 && `${Math.round(progress)}%`}</p>
      <div className="w-20 h-20 min-w-[40px] bg-red-600 animate-ping rounded-full flex items-center justify-center relative">
        <div className="absolute inset-0 rounded-full bg-red-600 blur-xl"></div>
      </div>
    </div>
  )
};

export const FileUploader = ({ fileType, setIsFileLoading, setFileUploadingStatus, setFileUploadURL }) => {
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
    setIsFileLoading(true);
    const storageRef = ref(storage, storagePath + fileToUpload.name);
    const uploadTask = uploadBytesResumable(storageRef, fileToUpload);
    
    // Listen for state changes
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadingStatus(progress);
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
            setIsFileLoading(false);
            setFileUploadURL(downloadURL);
          })
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

const DisabledButton = () => {
  return (
    <div className="flex items-center justify-center w-24 p-4">
        <button disabled type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
          <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
          </svg>
          Loading...
        </button>  
      </div>
  )
}

export default DashboardNewSong;