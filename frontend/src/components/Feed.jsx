import React from "react";
import { FaRegHeart } from "react-icons/fa6";
import { FaRocketchat } from "react-icons/fa6";
import StoryDp from "./StoryDp";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Post from "./Post";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const {postData} = useSelector(state => state.post)
  const {userData} = useSelector(state => state.user)
  const {storyList} = useSelector(state => state.story)
  const navigate = useNavigate()
  return (
    <div className="w-full lg:w-[50%] bg-black min-h-[100vh] lg:h-[100vh] relative lg:overflow-y-auto">
      <div className="w-full h-[80px] flex items-center justify-between p-[20px] lg:hidden">
        <div>
          <p className="text-lg font-serif font-bold border-b-2 border-b-white text-cyan-400">
            Moodly
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* <FaRegHeart className="text-white w-[25px] h-[25px]" /> */}
          <FaRocketchat onClick={()=> navigate("/messageBox")} className="text-white w-[25px] h-[25px]" />
        </div>
      </div>
      <div className="w-full flex gap-[20px] overflow-auto items-center py-[15px] px-[10px]">
        <StoryDp userName={"Your Story"} profileImg={userData.profileImg} story={userData.story}/>
        {storyList?.map((story,index)=>(
          <StoryDp userName={story?.author.userName} profileImg={story?.author.profileImg} story={story} key={index}/>
        ))}
        
      </div>
      <div className="w-full min-h-[100vh] flex flex-col items-center gap-[20px] p-[10px] pt-[40px] bg-white rounded-t-[60px] pb-[120px] relative">
       <Navbar/>
       {postData?.map((post,index)=>(
        <Post post={post}/>
       ))}
      </div>
    </div>
  );
};

export default Feed;
