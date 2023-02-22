import { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { useUploadSongState } from '../../context/UploadSongContext/UploadSongStateContext';
import { uploadSongActionType } from '../../context/UploadSongContext/UploadSongReducer';

const FilterButtons = ({ filterData, flag }) => {
  const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState(false);
  const [dropDownSelectionValue, setDropDownSelectionValue] = useState(null);
  const [_, dispatch] = useUploadSongState();

  let dropDownDisplayName = dropDownSelectionValue ?? flag;

  const updateFilterButton = (filterName) => {
    setDropDownSelectionValue(filterName);
    setIsDropDownMenuOpen(false);

    switch (flag) {
      case 'Artist':
        dispatch({ type: uploadSongActionType.SET_ARTIST_DROP_DOWN_SELECTION, filterValue: filterName });
        break;
      case 'Album':
        dispatch({ type: uploadSongActionType.SET_ALBUM_DROP_DOWN_SELECTION, filterValue: filterName });
        break;
      case 'Language':
        dispatch({ type: uploadSongActionType.SET_LANGUAGE_DROP_DOWN_SELECTION, filterValue: filterName });
        break;
      case 'Category':
        dispatch({ type: uploadSongActionType.SET_CATEGORY_DROP_DOWN_SELECTION, filterValue: filterName });
        break;
    }
  };

  return (
    <div className="border border-gray-300 rounded-md px-4 py-1 relative cursor-pointer hover:border-gray-400" onClick={() => setIsDropDownMenuOpen(!isDropDownMenuOpen)}>
      <p className='text-base tracking-wide text-textColor flex items-center gap-2'>
        {dropDownDisplayName}
        <IoChevronDown className={`text-base text-textColor duration-150 transition-all ease-in-out ${isDropDownMenuOpen ? 'rotate-180' : 'rotate-0'}`} />
      </p>
      {isDropDownMenuOpen && filterData && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="w-48 z-50 backdrop-blur-sm max-h-44 overflow-y-scroll scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 py-2 flex flex-col rounded-md shadow-md absolute top-8 left-0"
        >
          {filterData.map(data =>
            <div key={data.name} className="flex items-center gap-2 px-4 py-1 hover:bg-gray-200" onClick={() => updateFilterButton(data.name)}>
              {(flag === 'Artist' || flag === 'Album') && <img src={data.imageURL} className="w-8 min-w-[32px] h-8 rounded-full object-cover" />}
              <p className='w-full'>{data.name}</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default FilterButtons;