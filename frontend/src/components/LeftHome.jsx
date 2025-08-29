import React from "react";
import { FaRegHeart } from "react-icons/fa6";
import logo from "../assets/dp-logo.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import OtherUsers from "./OtherUsers";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";

const LeftHome = () => {
  const { userData,suggestedUsers} = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logout = async()=>{
      try {
        const res = await axios.get(`${serverUrl}/api/auth/signOut`,{withCredentials:true})
        dispatch(setUserData(null))
      } catch (error) {
        console.log(error)
      }
  }
  return (
    <div className="w-[25%] min-h-screen bg-black border-r border-gray-900 hidden lg:block">
      <div className="w-full h-[80px] flex items-center justify-between p-[20px]">
        <div>
          <p className="text-lg font-serif font-bold border-b-2 border-b-white text-cyan-400">
            Moodly
          </p>
        </div>
        <div>
          {/* <FaRegHeart className="text-white w-[25px] h-[25px]" /> */}
        </div>
      </div>
      <div className="flex items-center justify-between p-[10px] border-b-2 border-b-gray-500 ">
        <div className="flex items-center gap-[10px]">
          <div onClick={()=>navigate(`/profile/${userData.userName}`)} className="w-[60px] h-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
            <img src={userData?.profileImg || logo} alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-[20px] text-white font-semibold">
              {userData.userName}
            </div>
            <div className="text-[12px] text-gray-400 font-semibold">
              {userData.name}
            </div>
          </div>
        </div>
        <div onClick={logout} className="text-blue-500 font-semibold cursor-pointer">Log Out</div>

      </div>
      <div className="w-full flex flex-col gap-[20px] p-[20px]">
        <h1 className="text-white text-[19px] ">Suggested Users</h1>
         {suggestedUsers && suggestedUsers.slice(0,3).map((user,index)=>(
          <OtherUsers key={index} user={user}/>
         ))}
      </div>
    </div>
  );
};

export default LeftHome;
