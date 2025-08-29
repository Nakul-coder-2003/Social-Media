import React, { useEffect, useState } from "react";
import {
  FaRegHeart,
  FaHeart,
  FaRegComment,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { LuSendHorizontal } from "react-icons/lu";
import dp from "../assets/dp-logo.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setPostData } from "../redux/postSlice";
import { setUserData } from "../redux/userSlice";
import FollowButton from "./FollowButton";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";

const Post = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [mediaType, setMediaType] = useState("");
  const { userData } = useSelector((state) => state.user);
  const { postData } = useSelector((state) => state.post);
  const { socket } = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${hours}:${minutes}, ${day}-${month}-${year}`;
  };

  useEffect(() => {
    if (!post?.media) {
      setMediaType("");
      return;
    }
    const ext = post.media.split(".").pop().toLowerCase();
    if (["mp4", "webm", "ogg"].includes(ext)) {
      setMediaType("video");
    } else if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(ext)) {
      setMediaType("image");
    } else {
      setMediaType("");
    }
  }, [post?.media]);

  const handleLike = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/post/like/${post?._id}`, {
        withCredentials: true,
      });
      const updatePost = res.data;
      const updatedPosts = postData.map((p) =>
        p._id == post._id ? updatePost : p
      );
      dispatch(setPostData(updatedPosts));
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async () => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/post/comment/${post?._id}`,
        { message },
        { withCredentials: true }
      );
      const updatePost = res.data;
      const updatedPosts = postData.map((p) =>
        p._id == post._id ? updatePost : p
      );
      setMessage("");
      dispatch(setPostData(updatedPosts));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaved = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/post/saved/${post?._id}`, {
        withCredentials: true,
      });
      dispatch(setUserData(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket?.on("likePost", (updateData) => {
      const updatedPost = postData?.map((p) =>
        p._id == updateData.postId ? { ...p, likes: updateData.likes } : p
      );
      dispatch(setPostData(updatedPost));
    });
    socket?.on("commentedPost", (updateData) => {
      const updatedPost = postData?.map((p) =>
        p._id == updateData.postId ? { ...p, comments: updateData.comments } : p
      );
      dispatch(setPostData(updatedPost));
    });
    return () => {
      socket?.off("likePost");
      socket?.off("commentedPost");
    };
  }, [socket, postData, dispatch]);

  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-black w-full max-w-md  mb-6">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={post?.author?.profileImg}
            alt="profile"
            onClick={() => navigate(`profile/${post?.author?.userName}`)}
            className="w-10 h-10 rounded-full border border-gray-400 object-cover cursor-pointer"
          />
          <span className="font-semibold text-gray-800">
            {post?.author?.userName}
          </span>
        </div>
        {userData._id != post.author._id && (
          <FollowButton
            tailwind={"bg-black px-6 py-2 rounded-2xl text-white font-semibold"}
            targetUserId={post.author._id}
          />
        )}
      </div>
      {/* Post Media */}
      <div className=" flex items-center justify-center rounded-full pb-3">
        {mediaType == "video" && (
          <video
            controls
            className="max-w-[80%] max-h-[400px] object-cover"
            src={post.media}
          />
        )}
        {mediaType == "image" && (
          <img
            src={post.media}
            alt="post"
            className="max-w-[80%] max-h-[400px] object-cover"
          />
        )}
      </div>
      <div className="font-semibold px-[10px] font-sans uppercase text-gray-800">
        {post.caption}
      </div>
      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <button onClick={handleLike}>
            {!post?.likes.includes(userData._id) && (
              <FaRegHeart className="text-gray-700 text-2xl cursor-pointer" />
            )}

            {post?.likes.includes(userData._id) && (
              <FaHeart className="text-red-500 text-2xl cursor-pointer" />
            )}
          </button>
          <button onClick={() => setShowComments(!showComments)}>
            <FaRegComment className="text-gray-700 text-2xl cursor-pointer" />
          </button>
        </div>
        <button onClick={handleSaved}>
          {!userData?.saved.includes(post?._id) && (
            <FaRegBookmark className="text-gray-700 text-2xl cursor-pointer" />
          )}
          {userData?.saved.includes(post?._id) && (
            <FaBookmark className="text-gray-800 text-2xl cursor-pointer" />
          )}
        </button>
      </div>
      {/* count*/}
      <div className="flex items-center pl-[8px] gap-[4]">
        <div className="px-4 text-sm font-semibold text-gray-800">
          {/* {liked ? "You and 101 others liked this" : "0 like"} */}
          {post?.likes.length}
        </div>
        <div className="px-4 text-sm font-semibold text-gray-800">
          {/* {liked ? "You and 101 others liked this" : "0 like"} */}
          {post?.comments.length}
        </div>
      </div>
      {/* Comments (toggle) */}
      {showComments && (
        <div className="px-4 py-2">
          {post?.comments.map((comment, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-2">
              <img
                src={comment?.author?.profileImg || dp}
                alt="comment-profile"
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="font-semibold text-gray-800 text-xs">
                {comment?.author?.name}
              </span>
              <span className="text-gray-700 text-xs">{comment.message}</span>
            </div>
          ))}
          <div className="w-full mt-2 px-3 py-1 border rounded-full text-sm flex items-center justify-between">
            <div className="w-[90%]">
              <input
                type="text"
                placeholder="Add a comment..."
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                className="w-full outline-none"
              />
            </div>
            <div className="w-[10%] flex justify-end cursor-pointer">
              <LuSendHorizontal onClick={handleComment} />
            </div>
          </div>
        </div>
      )}
      {/* Timestamp */}
      <div className="px-4 pb-3 pt-2 text-xs text-gray-600">
        {formatDateTime(post?.createdAt)}
      </div>
    </div>
  );
};

export default Post;
