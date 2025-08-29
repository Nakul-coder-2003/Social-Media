import React from "react";
import logo from "../assets/dp-logo.png";
import { useNavigate } from "react-router-dom";
import FollowButton from "./FollowButton";
const OtherUsers = ({ user }) => {
  const navigate = useNavigate()
  return (
    <div className="w-full flex items-center justify-between">
      <div className="w-full flex items-center justify-between  border-b-1 border-b-gray-500 py-[10px]">
        <div className="flex items-center gap-[10px]">
          <div onClick={()=>navigate(`/profile/${user.userName}`)} className="w-[50px] h-[50px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
            <img src={user?.profileImg || logo} alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-[16px] text-white font-semibold">
              {user.userName}
            </div>
            <div className="text-[12px] text-gray-400 font-semibold">
              {user.name}
            </div>
          </div>
        </div>
        <FollowButton tailwind={'px-[10px] w-[100px] py-[5px] h-[40px] bg-white rounded-2xl flex items-center justify-center cursor-pointer'} targetUserId={user._id}/>
      </div>
    </div>
  );
};

export default OtherUsers;
