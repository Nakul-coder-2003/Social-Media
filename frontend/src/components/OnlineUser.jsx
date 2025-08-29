import React from "react";
import dp from "../assets/dp-logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../redux/messageSlice";

const OnlineUser = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="w-[60px] h-[60px] flex gap-[20px] justify-start items-center relative">
      <div
        onClick={() => {
          dispatch(setSelectedUser(user));
          navigate("/Messages");
        }}
        className="w-[50px] h-[50px] rounded-full  border-2 border-black cursor-pointer overflow-hidden flex items-center justify-center"
      >
        <img
          src={user?.profileImg || dp}
          alt=""
          className="w-full object-cover"
        />
      </div>
      <div className="w-[10px] h-[10px] bg-blue-500 rounded-full absolute top-0 right-0"></div>
    </div>
  );
};

export default OnlineUser;
