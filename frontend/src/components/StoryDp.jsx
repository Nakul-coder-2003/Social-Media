import React from "react";
import logo from "../assets/dp-logo.png";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const StoryDp = ({userName,profileImg,story}) => {
  const navigate = useNavigate()
  const {userData} = useSelector(state => state.user)
  const handleClick = ()=>{
    if(story && userName=="Your Story"){
      navigate(`/story/${userData.userName}`)
    }else{
      navigate(`/story/${userName}`)
    }
  }
  return (
    <div className="w-[70px]">
      <div className={`w-[70px] h-[70px] ${story?"bg-gradient-to-b from-blue-500 to-blue-950":""}  rounded-full flex items-center justify-center cursor-pointer relative`}>
        <div className="w-[60px] h-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden " onClick={handleClick}>
          <img src={profileImg || logo} alt="" className="w-full h-full object-cover" />
        </div>
        {!story && userName=="Your Story" && 
          <div>
             <BsFillPlusCircleFill onClick={()=>navigate("/uploadmedia")} className="text-white absolute bottom-0 right-0" />
          </div>}
      </div>
      <div className="text-white text-sm w-full truncate text-center">{userName}</div>
    </div>
  );
};

export default StoryDp;
