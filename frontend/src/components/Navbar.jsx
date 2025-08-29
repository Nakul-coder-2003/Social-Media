import React from "react";
import { MdHome } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { IoMdVideocam } from "react-icons/io";
import { FaRegPlusSquare } from "react-icons/fa";
import logo from "../assets/dp-logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate()
  const {userData} = useSelector(state=>state.user)
  return (
    <div className="w-[90%] lg:w-[40%] h-[60px] bg-black flex justify-around items-center fixed bottom-[20px] rounded-full shadow-2xl shadow-[#000000] z-[100]">
      <div>
        <MdHome onClick={()=>navigate("/")} className="text-white w-[28px] h-[28px] cursor-pointer"/>
      </div>
      <div>
        <IoSearch onClick={()=>navigate("/search")} className="text-white w-[28px] h-[28px] cursor-pointer"/>
      </div>
      <div>
        <IoMdVideocam onClick={()=> navigate("/reels")} className="text-white w-[28px] h-[28px] cursor-pointer"/>
      </div>
      <div>
        <FaRegPlusSquare onClick={()=>navigate("/uploadmedia")} className="text-white w-[28px] h-[28px] cursor-pointer"/>
      </div>
      <div onClick={()=>navigate(`/profile/${userData.userName}`)} className="w-[32px] h-[32px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
        <img src={userData?.profileImg || logo} alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Navbar;
