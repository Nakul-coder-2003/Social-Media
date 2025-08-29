import React, { useEffect, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dp from "../assets/dp-logo.png";

const StoryCard = ({storyData}) => {
  const navigate = useNavigate();
  
  const [progress,setProgress] = useState(0)
 
  useEffect(()=>{
    const interval = setInterval(()=>{
        setProgress(prev => {
            if(prev >= 100){
                clearInterval(interval)
                navigate("/")
                return 100
            }
            return prev+1
        })
    },150)
    return ()=> clearInterval(interval)
  },[navigate])

  return (
    <div className="w-full max-w-[500px] h-[100vh] border-x-2 border-gray-800 pt-[10px] relative flex flex-col justify-center">
      <div className="flex items-center gap-[15px] absolute top-4 px-[10px]">
        <div>
        <IoArrowBackSharp
          onClick={() => navigate(`/`)}
          className="text-white w-[25px] h-[25px] cursor-pointer"
        />
      </div>
      <div className="flex items-center gap-2">
        <img
          src={storyData?.author?.profileImg || dp}
          alt="profile"
          className="w-10 h-10 rounded-full border border-gray-400 object-cover cursor-pointer"
        />
        <span className="font-bold text-white">{storyData?.author?.userName}</span>
      </div>
      </div>
      <div className="w-full h-[90vh] flex items-center justify-center">
        {storyData.mediaType == "video" && (
          <video
            controls
            loop
            className="max-w-[90%] h-full object-cover rounded-2xl"
            src={storyData.media}
          />
        )}
        {storyData.mediaType == "image" && (
          <img
            src={storyData.media}
            alt="post"
            className="max-w-[90%] max-h-[400px] object-cover rounded-2xl"
          />
        )}
      </div>
      <div className="absolute top-0 w-full h-[5px] bg-gray-800">
        <div
          className="w-[280px] h-full bg-white transition-all duration-200 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StoryCard;
