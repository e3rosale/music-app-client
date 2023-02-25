import React, { useState, useEffect } from "react";
import { useStateValue } from "../../../context/StateContext";
import { filterByCategory, filterByLanguage } from "../../../utils/supportFunctions";
import { FilterButtons } from "..";
import { getAllAlbums, getAllArtists, getAllSongs, uploadAlbum, uploadArtist, uploadSong } from '../../../api';
import { actionType } from "../../../context/reducer";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../../config/firebase.config";
import { MdDelete } from "react-icons/md";
import { motion } from 'framer-motion';
import { useUploadSongState } from "../../../context/UploadSongContext/UploadSongStateContext";
import { uploadSongActionType } from "../../../context/UploadSongContext/UploadSongReducer";
import FileUploader, { fileUploaderTypes } from "./DashboardNewSongFileUploader";
import { useUploadArtistState } from "../../../context/UploadArtistContext/UploadArtistStateContext";
import { uploadArtistActionType } from "../../../context/UploadArtistContext/UploadArtistReducer";
import { useUploadAlbumState } from "../../../context/UploadAlbumContext/UploadAlbumStateContext";
import { uploadAlbumActionType } from "../../../context/UploadAlbumContext/UploadAlbumReducer";

const DashboardNewSong = () => {
  const { state, dispatch } = useStateValue();
  const [
    {
      songName,
      artistDropDownSelection,
      albumDropDownSelection,
      languageDropDownSelection,
      categoryDropDownSelection,
      imageFileIsLoading,
      imageFileLoadingProgress,
      imageFileURL,
      audioFileIsLoading,
      audioFileLoadingProgress,
      audioFileURL,
    }, 
    uploadSongDispatch
  ] = useUploadSongState();

  const [
    {
      artistName,
      artistTwitter,
      artistInstagram,
      artistImageUploadURL,
      artistDocumentCreationInProgress,
      artistImageFileStorageTransactionInProgress,
      artistImageFileStorageTransactionProgress
    }, uploadArtistDispatch
  ] = useUploadArtistState();

  const [
    {
      albumName,
      albumImageUploadURL,
      albumDocumentCreationInProgress,
      albumImageFileStorageTransactionInProgress,
      albumImageFileStorageTransactionProgress
    }, uploadAlbumDispatch
  ] = useUploadAlbumState();

  const [isSavingSong, setIsSavingSong] = useState(false);

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
  }, []);

  const deleteUploadedFile = (fileType) => {
    let uploadFileURL;

    if (fileType === "image") {
      uploadSongDispatch({ type: uploadSongActionType.SET_IMAGE_FILE_IS_LOADING, imageFileIsLoading: true });
      uploadSongDispatch({ type: uploadSongActionType.SET_IMAGE_FILE_LOADING_PROGRESS, imageFileLoadingProgress: 0 });
      uploadFileURL = imageFileURL;
    }

    if (fileType === "audio") {
      uploadSongDispatch({ type: uploadSongActionType.SET_AUDIO_FILE_IS_LOADING, audioFileIsLoading: true });
      uploadSongDispatch({ type: uploadSongActionType.SET_AUDIO_FILE_LOADING_PROGRESS, audioFileLoadingProgress: 0 });
      uploadFileURL = audioFileURL;
    }

    if (fileType === fileUploaderTypes.ARTIST_IMAGE) {
      uploadArtistDispatch({ type: uploadArtistActionType.SET_ARTIST_IMAGE_FILE_STORAGE_TRANSACTION_IN_PROGRESS, artistImageFileStorageTransactionInProgress: true });
      uploadArtistDispatch({ type: uploadArtistActionType.SET_ARTIST_IMAGE_FILE_STORAGE_TRANSACTION_PROGRESS, artistImageFileStorageTransactionProgress: 0 });
      uploadFileURL = artistImageUploadURL;
    }

    if (fileType === fileUploaderTypes.ALBUM_IMAGE) {
      uploadAlbumDispatch({ type: uploadAlbumActionType.SET_ALBUM_IMAGE_FILE_STORAGE_TRANSACTION_IN_PROGRESS, albumImageFileStorageTransactionInProgress: true });
      uploadAlbumDispatch({ type: uploadAlbumActionType.SET_ALBUM_IMAGE_FILE_STORAGE_TRANSACTION_PROGRESS, albumImageFileStorageTransactionProgress: 0 });
      uploadFileURL = albumImageUploadURL;
    }

    const targetFileRef = ref(storage, uploadFileURL);

    // delete the file
    deleteObject(targetFileRef)
      .then(() => {
        if (fileType === "image") {
          uploadSongDispatch({ type: uploadSongActionType.SET_IMAGE_FILE_IS_LOADING, imageFileIsLoading: false });
          uploadSongDispatch({ type: uploadSongActionType.SET_IMAGE_FILE_URL, imageFileURL: null });
        }

        if (fileType === "audio") {
          uploadSongDispatch({ type: uploadSongActionType.SET_AUDIO_FILE_IS_LOADING, audioFileIsLoading: false });
          uploadSongDispatch({ type: uploadSongActionType.SET_AUDIO_FILE_URL, audioFileURL: null });
        }

        if (fileType === fileUploaderTypes.ARTIST_IMAGE) {
          uploadArtistDispatch({ type: uploadArtistActionType.SET_ARTIST_IMAGE_FILE_STORAGE_TRANSACTION_IN_PROGRESS, artistImageFileStorageTransactionInProgress: false });
          uploadArtistDispatch({ type: uploadArtistActionType.SET_ARTIST_IMAGE_UPLOAD_URL, artistImageUploadURL: null });
        }

        if (fileType === fileUploaderTypes.ALBUM_IMAGE) {
          uploadAlbumDispatch({ type: uploadAlbumActionType.SET_ALBUM_IMAGE_FILE_STORAGE_TRANSACTION_IN_PROGRESS, albumImageFileStorageTransactionInProgress: false });
          uploadAlbumDispatch({ type: uploadAlbumActionType.SET_ALBUM_IMAGE_UPLOAD_URL, albumImageUploadURL: null });
        }
      })
      .catch(error => console.log(error));
  }

  const saveSong = async () => {
    setIsSavingSong(true);

    const newSongToSave =  {
      name: songName,
      imageURL: imageFileURL,
      songURL: audioFileURL,
      album: albumDropDownSelection,
      artist: artistDropDownSelection,
      language: languageDropDownSelection,
      category: categoryDropDownSelection,
      twitter: "fake-twitter-link",
      instagram: "fake-instagram-link"
    };

    try {
      await uploadSong(newSongToSave);
      setIsSavingSong(false);
      uploadSongDispatch({ type: uploadSongActionType.CLEAR_ALL_SONG_FIELDS });

      getAllSongs()
        .then(songs => {
          dispatch({ type: actionType.SET_ALL_SONGS, allSongs: songs.data });
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }

  const saveArtist = async () => {
    uploadArtistDispatch({ type: uploadArtistActionType.SET_ARTIST_DOCUMENT_CREATION_IN_PROGRESS, artistDocumentCreationInProgress: true });

    const newArtistToSave = {
      name: artistName,
      imageURL: artistImageUploadURL,
      twitter: artistTwitter,
      instagram: artistInstagram,
    };

    try {
      await uploadArtist(newArtistToSave);
      uploadArtistDispatch({ type: uploadArtistActionType.CLEAR_ALL_ARTIST_FIELDS });

      getAllArtists()
        .then(artists => {
          dispatch({ type: actionType.SET_ALL_ARTISTS, allArtists: artists.data ?? [] });
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }

  const saveAlbum = async () => {
    uploadAlbumDispatch({ type: uploadAlbumActionType.SET_ALBUM_DOCUMENT_CREATION_IN_PROGRESS, albumDocumentCreationInProgress: true });

    const newAlbumToSave = {
      name: albumName,
      imageURL: albumImageUploadURL
    };

    try {
      await uploadAlbum(newAlbumToSave);

      getAllAlbums()
        .then(albums => {
          dispatch({ type: actionType.SET_ALL_ALBUMS, allAlbums: albums.data ?? [] });
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    } finally {
      uploadAlbumDispatch({ type: uploadAlbumActionType.CLEAR_ALL_ALBUM_FIELDS });
    }
  }

  const areAllSongFieldsPopulated = 
    () => songName && artistDropDownSelection && languageDropDownSelection && categoryDropDownSelection && imageFileURL && audioFileURL;

  const areAllArtistFieldsPopulated = () => artistName && artistImageUploadURL && artistTwitter && artistInstagram;

  const areAllAlbumFieldsPopulated = () => albumName && albumImageUploadURL;

  return (
    <div className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-md gap-4">
      <p className="font-bold">Song Details</p>
      <input 
        type="text" 
        placeholder="Type your song name..." 
        className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
        value={songName ?? ""}
        onChange={(e) => uploadSongDispatch({type: uploadSongActionType.SET_SONG_NAME, songName: e.target.value })}
      />
      <div className="flex w-full justify-between flex-wrap items-center gap-4">
        <FilterButtons filterData={state.allArtists} flag={"Artist"} />
        <FilterButtons filterData={state.allAlbums} flag={"Album"} />
        <FilterButtons filterData={filterByLanguage} flag={"Language"} />
        <FilterButtons filterData={filterByCategory} flag={"Category"} />
      </div>
      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {imageFileIsLoading && <FileLoader progress={imageFileLoadingProgress} />}
        {!imageFileIsLoading && (
          <>
            {imageFileURL ?
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img src={imageFileURL} className="w-full h-full object-cover" alt="song image upload"/>
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                  onClick={() => deleteUploadedFile("image")}
                >
                  <MdDelete className="text-white" />
                </button>
              </div> : 
              <FileUploader fileType={fileUploaderTypes.SONG_IMAGE} />
            }
          </>
        )}
      </div>
      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {audioFileIsLoading && <FileLoader progress={audioFileLoadingProgress} />}
        {!audioFileIsLoading && (
          <>
            {audioFileURL ? 
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-md">
                <audio controls src={audioFileURL} />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                  onClick={() => deleteUploadedFile("audio")}
                >
                  <MdDelete className="text-white" />
                </button>
              </div> : 
              <FileUploader fileType={fileUploaderTypes.SONG_AUDIO}/>
            }
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
      <hr className="border-gray-300 w-full mb-8"/>
      <p className="font-bold">Artist Details</p>
      <input 
        type="text" 
        placeholder="Type your artist name..." 
        className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
        value={artistName ?? ""}
        onChange={(e) => uploadArtistDispatch({ type: uploadArtistActionType.SET_ARTIST_NAME, artistName: e.target.value })}
        disabled={!!artistDocumentCreationInProgress}
      />
      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {artistImageFileStorageTransactionInProgress && <FileLoader progress={artistImageFileStorageTransactionProgress} />}
        {!artistImageFileStorageTransactionInProgress && (
          <>
            {artistImageUploadURL ?
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img src={artistImageUploadURL} className="w-full h-full object-cover" alt="artist image upload"/>
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                  onClick={() => deleteUploadedFile(fileUploaderTypes.ARTIST_IMAGE)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div> : 
              <FileUploader fileType={fileUploaderTypes.ARTIST_IMAGE} />
            }
          </>
        )}
      </div>
      <div className="w-full flex items-center rounded-md p-3 border border-gray-300 shadow-sm bg-transparent">
        <span className="text-base font-semibold text-gray-400">www.twitter.com/</span>
        <input 
          type="text" 
          placeholder="your twitter id..." 
          className="bg-inherit text-base text-textColor font-semibold outline-none flex-1"
          value={artistTwitter ?? ""}
          onChange={(e) => uploadArtistDispatch({ type: uploadArtistActionType.SET_ARTIST_TWITTER, artistTwitter: e.target.value })}
          disabled={!!artistDocumentCreationInProgress}
        />
      </div>
      <div className="w-full flex items-center rounded-md p-3 border border-gray-300 shadow-sm bg-transparent">
        <span className="text-base font-semibold text-gray-400">www.instagram.com/</span>
        <input 
          type="text" 
          placeholder="your instagram id..." 
          className="bg-inherit text-base text-textColor font-semibold outline-none flex-1"
          value={artistInstagram ?? ""}
          onChange={(e) => uploadArtistDispatch({ type: uploadArtistActionType.SET_ARTIST_INSTAGRAM, artistInstagram: e.target.value })}
          disabled={!!artistDocumentCreationInProgress}
        />
      </div>
      <div className="flex items-center justify-center w-60 p-4">
        {artistDocumentCreationInProgress ? 
          (<DisabledButton/>)
          : 
          (<motion.button whileTap={{ scale: 0.75 }} className="px-8 py-2 w-full rounded-md text-white bg-red-600 hover:shadow-lg disabled:opacity-60" onClick={saveArtist} disabled={!areAllArtistFieldsPopulated()}>
            Save artist
          </motion.button>)
        }
      </div>
      <hr className="border-gray-300 w-full mb-8"/>
      <p className="font-bold">Album Details</p>
      <input 
        type="text" 
        placeholder="Type your album name..." 
        className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
        value={albumName ?? ""}
        onChange={(e) => uploadAlbumDispatch({ type: uploadAlbumActionType.SET_ALBUM_NAME, albumName: e.target.value })}
        disabled={!!albumDocumentCreationInProgress}
      />
      <div className="bg-card backdrop-blur-md w-full h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
        {albumImageFileStorageTransactionInProgress && <FileLoader progress={albumImageFileStorageTransactionProgress} />}
        {!albumImageFileStorageTransactionInProgress && (
          <>
            {albumImageUploadURL ?
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img src={albumImageUploadURL} className="w-full h-full object-cover" alt="album image upload"/>
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out"
                  onClick={() => deleteUploadedFile(fileUploaderTypes.ALBUM_IMAGE)}
                >
                  <MdDelete className="text-white" />
                </button>
              </div> : 
              <FileUploader fileType={fileUploaderTypes.ALBUM_IMAGE} />
            }
          </>
        )}
      </div>
      <div className="flex items-center justify-center w-60 p-4">
        {albumDocumentCreationInProgress ? 
          (<DisabledButton/>)
          : 
          (<motion.button whileTap={{ scale: 0.75 }} className="px-8 py-2 w-full rounded-md text-white bg-red-600 hover:shadow-lg disabled:opacity-60" onClick={saveAlbum} disabled={!areAllAlbumFieldsPopulated()}>
            Save album
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
  );
};

const DisabledButton = () => {
  return (
    <div className="flex items-center justify-center w-24 p-4">
        <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
          <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
          </svg>
          Loading...
        </button>  
      </div>
  )
}

export default DashboardNewSong;