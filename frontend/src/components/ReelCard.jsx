import React, { useEffect, useRef, useState } from "react";
import { GoUnmute } from "react-icons/go";
import { GoMute } from "react-icons/go";
import FollowButton from "./FollowButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa";
import axios from "axios";
import { setReelData } from "../redux/reelSlice";
import dp from "../assets/dp-logo.png";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineSend } from "react-icons/md";
import { serverUrl } from "../App";

const ReelCard = ({ reel }) => {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(true);
  const [ismute, setIsMute] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { reelData } = useSelector((state) => state.reel);
  const [showComment, setShowComment] = useState(false);
  const commentRef = useRef();
  const [message, setMessage] = useState("");

  const handleClick = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(percent);
    }
  };

  const handleLike = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/api/reel/like/${reel?._id}`,
        { withCredentials: true }
      );
      const updateReel = res.data;
      const updatedReels = reelData.map((p) =>
        p._id == reel._id ? updateReel : p
      );
      dispatch(setReelData(updatedReels));
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async () => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/reel/comment/${reel?._id}`,
        { message },
        { withCredentials: true }
      );
      const updateReel = res.data;
      const updatedReels = reelData.map((p) =>
        p._id == reel._id ? updateReel : p
      );
      
      dispatch(setReelData(updatedReels));
      setMessage("")
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (commentRef.current && !commentRef.current.contains(e.target)) {
        setShowComment(false);
      }
    };
    if (showComment) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showComment]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (entry.isIntersecting) {
          video.play();
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full md:w-[480px] h-[100vh]  flex items-center justify-center  border-l-2 border-r-2 border-gray-800 relative overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={ismute}
        src={reel?.media}
        className="w-full h-full"
        onClick={handleClick}
        onTimeUpdate={handleTimeUpdate}
      />
      <div
        className="absolute top-[20px] right-[20px] z-[100]"
        onClick={() => setIsMute((prev) => !prev)}
      >
        {!ismute ? (
          <GoUnmute className="w-[20px] h-[20px text-white font-semibold]" />
        ) : (
          <GoMute className="w-[20px] h-[20px text-white font-semibold]" />
        )}
      </div>
      <div className="absolute bottom-0 w-full h-[5px] bg-gray-800">
        <div
          className="w-[280px] h-full bg-white transition-all duration-200 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="w-full h-[80px] absolute bottom-[10px] px-[10px] z-[100]">
        <div className="flex items-center gap-3">
          <img
            src={reel?.author?.profileImg || dp}
            alt="profile"
            onClick={() => navigate(`/profile/${userData?.userName}`)}
            className="w-10 h-10 rounded-full border border-gray-400 object-cover cursor-pointer"
          />
          <span className="font-bold text-white">{reel?.author?.userName}</span>
          <FollowButton
            targetUserId={reel?.author?._id}
            tailwind={
              "px-[10px] py-[3px] text-white border-2 border-blue-500 font-semibold bg-blue-500"
            }
          />
        </div>
        <div className="text-white font-bold px-[10px] py-[5px]">
          {reel?.caption}
        </div>
      </div>
      <div className="absolute right-[10px] bottom-[150px] text-white flex flex-col gap-[20px] items-center justify-center px-[10px]">
        <div className="flex flex-col items-center justify-center">
          <button onClick={handleLike}>
            {!reel?.likes.includes(userData._id) && (
              <FaRegHeart className="text-white text-2xl cursor-pointer" />
            )}

            {reel?.likes.includes(userData._id) && (
              <FaHeart className="text-red-500 text-2xl cursor-pointer" />
            )}
          </button>
          <div>{reel?.likes.length}</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button onClick={() => setShowComment(true)}>
            <FaRegComment className="text-white text-2xl cursor-pointer" />
          </button>
          <div>{reel?.comments.length}</div>
        </div>
      </div>

      {/* Comment Box */}
      {showComment && (
        <div
          ref={commentRef}
          className="absolute bottom-0 left-0 w-full h-[400px] p-[10px] rounded-t-4xl bg-[#173033] z-[200] flex flex-col"
        >
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-white text-[22px] font-bold">Comments</h1>
            <button onClick={() => setShowComment(false)}>
              <RxCross2 className="text-white text-2xl cursor-pointer" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto mb-2">
            {reel?.comments?.length > 0 ? (
              reel.comments.map((comment, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-3">
                  <img
                    src={comment?.author?.profileImg || dp}
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-semibold text-white text-sm">
                    {comment?.author?.userName}
                  </span>
                  <span className="text-gray-300 text-sm">
                    {comment?.message}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-center mt-10">
                No comments yet.
              </div>
            )}
          </div>
          <div className="flex items-center border-t border-gray-700 pt-2">
            <img
              src={reel?.author?.profileImg || dp}
              alt="profile"
              onClick={() => navigate(`/profile/${userData?.userName}`)}
              className="w-10 h-10 rounded-full border border-gray-400 object-cover cursor-pointer"
            />
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 px-3 py-2 rounded-full bg-gray-800 text-white outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleComment} className="ml-2">
              <MdOutlineSend className="text-white text-2xl cursor-pointer" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReelCard;
