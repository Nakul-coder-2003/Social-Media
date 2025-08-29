import React, { useRef, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaRegPlusSquare } from "react-icons/fa";
import { GoUnmute } from "react-icons/go";
import { GoMute } from "react-icons/go";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { setPostData } from "../redux/postSlice";
import { setReelData } from "../redux/reelSlice";
import { setStoryData } from "../redux/storySlice";
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../App";

const Uploadmedia = () => {
  const navigate = useNavigate();
  const [uploadType, setUploadType] = useState("Post");
  const inputmedia = useRef();
  const [frontendMedia, setFrontendMedia] = useState(null);
  const [backendMedia, setBackendMedia] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const [isPlaying, setPlaying] = useState(true);
  const videoTag = useRef();
  const [mute, setMute] = useState(false);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { postData } = useSelector((state) => state.post);
  const { reelData } = useSelector((state) => state.reel);
  const { storyData } = useSelector((state) => state.story);

  const handleMedia = (e) => {
    const file = e.target.files[0];
    if (file.type.includes("image")) {
      setMediaType("image");
    } else {
      setMediaType("video");
    }
    setBackendMedia(file);
    setFrontendMedia(URL.createObjectURL(file));
  };

  const handleClick = () => {
    if (isPlaying) {
      videoTag.current.pause();
      setPlaying(false);
    } else {
      videoTag.current.play();
      setPlaying(true);
    }
  };

  const uploadPost = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("mediaType", mediaType);
      formData.append("media", backendMedia);
      const res = await axios.post(
        `${serverUrl}/api/post/upload`,
        formData,
        { withCredentials: true }
      );
      dispatch(setPostData([...postData, res.data]));
      console.log(res);
      setLoading(false);
      setFrontendMedia(null)
      setCaption("")
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const uploadReel = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("mediaType", mediaType);
      formData.append("media", backendMedia);
      const res = await axios.post(
        `${serverUrl}/api/reel/upload`,
        formData,
        { withCredentials: true }
      );
      dispatch(setReelData([...reelData, res.data]));
      console.log(res);
      setLoading(false);
      setFrontendMedia(null)
      setCaption("")
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const uploadStory = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("mediaType", mediaType);
      formData.append("media", backendMedia);
      const res = await axios.post(
        `${serverUrl}/api/story/upload`,
        formData,
        { withCredentials: true }
      );
      // dispatch(setStoryData([...storyData, res.data]));
      setUserData((prev)=> ({...prev,story:res.data}))
      setLoading(false);
      setFrontendMedia(null)
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleUpload = () => {
    if (uploadType == "Post") {
      uploadPost();
    } else if (uploadType == "Story") {
      uploadStory();
    } else {
      uploadReel();
    }
  };

  return (
    <div className="w-full h-[100vh] bg-black flex flex-col items-center gap-[20px] pb-[20px] overflow-auto">
      <div className="w-full h-[50px] flex items-center gap-[20px] fixed left-[20px] px-[20px] py-[20px]">
        <div>
          <IoArrowBackSharp
            onClick={() => navigate("/")}
            className="text-white w-[25px] h-[25px] cursor-pointer"
          />
        </div>
        <h1 className="text-white text-[20px] font-semibold">Upload Media</h1>
      </div>

      <div className="w-[90%] md:w-[600px] h-[70px] mt-[50px] bg-white rounded-full flex justify-around items-center gap-[10px]">
        <div
          onClick={() => setUploadType("Post")}
          className={`${
            uploadType == "Post"
              ? "bg-black shadow-2xl shadow-black text-white"
              : ""
          } w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
        >
          Post
        </div>

        <div
          onClick={() => setUploadType("Story")}
          className={`${
            uploadType == "Story"
              ? "bg-black shadow-2xl shadow-black text-white"
              : ""
          } w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
        >
          Story
        </div>

        <div
          onClick={() => setUploadType("Reel")}
          className={`${
            uploadType == "Reel"
              ? "bg-black shadow-2xl shadow-black text-white"
              : ""
          } w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
        >
          Reel
        </div>
      </div>

      {!frontendMedia && (
        <div className="w-[90%] md:w-[500px] h-[250px] bg-[#0e1316] border-gray-800 border-2 flex flex-col items-center justify-center gap-[8px] hover:bg-[#353a3d]">
          <input type="file" accept={uploadType=="Reel"?"video/*":""} hidden ref={inputmedia} onChange={handleMedia} />
          <div onClick={() => inputmedia.current.click()}>
            <FaRegPlusSquare className="text-white w-[28px] h-[28px] cursor-pointer" />
          </div>
          <div
            onClick={() => inputmedia.current.click()}
            className="text-white text-[19px] font-semibold cursor-pointer"
          >
            {uploadType} Upload
          </div>
        </div>
      )}

      {frontendMedia && (
        <div className="w-[80%] md:w-[500px] h-[360px] flex flex-col items-center justify-center ">
          {mediaType == "image" && (
            <div className="w-full md:w-[300px] h-[360px] rounded-2xl overflow-hidden">
              <img
                src={frontendMedia}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {mediaType == "video" && (
            <div
              onClick={() => setMute((prev) => !prev)}
              className="w-full md:w-[300px] h-[360px] rounded-2xl overflow-hidden relative"
            >
              <video
                src={frontendMedia}
                ref={videoTag}
                autoPlay
                loop
                muted={mute}
                onClick={handleClick}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-[10px] right-[10px]">
                {!mute ? (
                  <GoUnmute className="w-[20px] h-[20px] text-white font-semibold" />
                ) : (
                  <GoMute className="w-[20px] h-[20px] text-white font-semibold" />
                )}
              </div>
            </div>
          )}
          {uploadType != "Story" && (
            <input
              type="text"
              onChange={(e) => setCaption(e.target.value)}
              value={caption}
              className="w-full border-b-gray-400 border-b-2 outline-none px-[10px] py-[5px] text-white mt-[10px]"
              placeholder="write caption"
            />
          )}
        </div>
      )}

      {frontendMedia && (
        <div
          onClick={handleUpload}
          className="px-[10px] w-[60%] md:w-[500px] h-[50px] bg-white  cursor-pointer rounded-2xl flex items-center justify-center font-semibold"
        >
          {loading ? (
            <ClipLoader size={30} color="black" />
          ) : (
            `${uploadType} Upload`
          )}
        </div>
      )}
    </div>
  );
};

export default Uploadmedia;
