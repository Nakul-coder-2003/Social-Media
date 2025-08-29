import React, { useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoopCard from "../components/ReelCard";

const Reels = () => {
  const navigate = useNavigate();
  const { reelData } = useSelector((state) => state.reel);
  return (
    <div className="w-screen h-screen bg-black overflow-hidden flex justify-center items-center ">
      <div className="w-full h-[50px] flex items-center gap-[20px] fixed left-[20px] top-[20px] px-[20px] z-20">
        <div>
          <IoArrowBackSharp
            onClick={() => navigate("/")}
            className="text-white w-[25px] h-[25px] cursor-pointer"
          />
        </div>
        <h1 className="text-white text-[20px] font-semibold">Reels</h1>
      </div>
      <div className="h-[100vh] overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
        {reelData.map((reel, index) => (
          <div className="h-screen snap-start">
            <LoopCard reel={reel} key={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reels;
