import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";

const SongCard = ({ data, index }) => {
  console.log('data: ');
  console.log(data);
  return (
    <motion.div className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center">
      <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
        <motion.img src={data.imageURL} whileHover={{ scale: 1.05 }} className="w-full h-full rounded-lg object-cover"/>
      </div>
      <p className="self-start w-full truncate text-base text-headingColor font-semibold my-2">
        {data.name}
      </p>
      <p className="text-sm text-gray-400 my-1">
        {data.artist}
      </p>
      <motion.i className="self-start text-base text-red-400 drop-shadow-md" whileTap={{ scale: 0.75 }}>
        <MdDelete/>
      </motion.i>
    </motion.div>
  )
};

export default SongCard;