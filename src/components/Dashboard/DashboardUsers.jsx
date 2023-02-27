import React, { useState } from "react";
import { motion } from 'framer-motion';
import { useApplicationState } from "../../context/ApplicationContext/ApplicationStateContext";
import moment from 'moment';
import { changeUserRole, deleteUser, getAllUsers } from "../../api";
import { actionType } from "../../context/ApplicationContext/ApplicationReducer";
import { MdDelete } from "react-icons/md";
import { useEffect } from "react";

const DashboardUsers = () => {
  const { state, dispatch } = useApplicationState();

  useEffect(() => {
    if (state.allUsers) {
      return;
    }

    getAllUsers()
      .then(users => {
        dispatch({ type: actionType.SET_ALL_USERS, allUsers: users.data });
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      {/* filters */}

      {/* tabular data form */}
      <div className="relative w-full py-12 min-h-[400px] overflow-x-scroll my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3">
        {/* total count of the user */}
        <div className="absolute top-4 left-4">
          <p className="text-sm font-semibold">Count: <span className="text-xl font-bold text-textColor">{state.allUsers?.length ?? 0}</span></p>
        </div>
        {/* table data */}
        <div className="w-full min-w-[750px] flex items-center justify-between">
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Image</p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Name</p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Email</p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Verified</p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Created</p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Role</p>
        </div>

        {/* table body content */}
        {state.allUsers?.map((user, index) => <DashboardUserCard data={user} key={index} isNotCurrentUser={user.user_id !== state.user?.user_id} />)}
      </div>
    </div>
  );
};

export const DashboardUserCard = ({ data, isNotCurrentUser }) => {
  const createdAt = moment(new Date(data.createdAt)).format("MMMM Do YYYY");
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useApplicationState();

  const updateUserRole = async (userId, role) => {
    setIsOpen(false);

    try {
      const updatedUser = await changeUserRole(userId, role);
  
      if (updatedUser.data === undefined) {
        return;
      }

      try {
        const users = await getAllUsers();
        dispatch({ type: actionType.SET_ALL_USERS, allUsers: users.data ?? [] });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      // This error can be of type AxiosError or Error
      // Any axios response status code other than 2xx will be an error
      console.log(error);
    }
  }

  const removeUser = async (userId) => {
    try {
      const deletedUser = await deleteUser(userId);

      if (deletedUser.data === undefined) {
        return;
      }

      try {
        const users = await getAllUsers();
        dispatch({ type: actionType.SET_ALL_USERS, allUsers: users.data ?? [] });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <motion.div className="relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md">
      {isNotCurrentUser && (
        <motion.div whileTap={{ scale: 0.75 }} className="absolute left-4 w-8 h-8 rounded-md flex items-center justify-center bg-gray-200" onClick={() => removeUser(data._id)}>
          <MdDelete className="text-xl text-red-400 hover:text-red-500"/>
        </motion.div>
      )}
      {/* user image */}
      <div className="w-275 min-w-[160px] flex items-center justify-center">
        <img src={data.imageURL} referrerPolicy="no-referrer" alt="User image" className="w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md" />
      </div>

      {/* user details */}
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">{data.name}</p>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">{data.email}</p>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">{data.email_verified ? 'True' : 'False'}</p>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">{createdAt}</p>
      <div className="w-275 min-w-[160px] text-center flex items-center justify-center gap-6 relative">
        <p className="text-base text-textColor text-center">{data.role}</p>
        {isNotCurrentUser && (<motion.p whileTap={{ scale: 0.75 }} className="text-[10px] font-semibold text-textColor px-1 bg-purple-200 rounded-sm hover:shadow-md" onClick={() => setIsOpen(true)}>{data.role === "admin" ? "Member" : "Admin"}</motion.p>)}
        {isOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="absolute z-10 top-6 right-4 p-4 flex items-start flex-col gap-4 bg-white shadow-xl rounded-md">
            <p className="text-textColor text-[12px] font-semibold">Are you sure you want to set the user as <span>{data.role === "admin" ? "Member" : "Admin"}?</span></p>
            <div className="flex items-center gap-4">
              <motion.button whileTap={{ scale: 0.75 }} className="outline-none border-none text-sm px-4 py-1 rounded-md bg-blue-200 text-black hover:shadow-md" onClick={() => updateUserRole(data._id, data.role === 'admin' ? 'member' : 'admin')}>Yes</motion.button>
              <motion.button whileTap={{ scale: 0.75 }} className="outline-none border-none text-sm px-4 py-1 rounded-md bg-gray-200 text-black hover:shadow-md" onClick={() => setIsOpen(false)}>No</motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default DashboardUsers;