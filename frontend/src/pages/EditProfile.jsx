import React, { useRef, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../assets/dp-logo.png";
import axios from "axios";
import { setProfileData, setUserData } from "../redux/userSlice";
import { ClipLoader } from "react-spinners";
import { serverUrl } from "../App";

const EditProfile = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const imageInput = useRef();
  const [frontendImg, setFrontendImg] = useState(userData?.profileImg || logo);
  const [backendImg, setBackendImg] = useState(null);
  const [name, setName] = useState(userData?.name || "");
  const [userName, setUserName] = useState(userData?.userName || "");
  const [bio, setBio] = useState(userData?.bio || "");
  const [profession, setProfession] = useState(userData?.profession || "");
  const [gender, setGender] = useState(userData?.gender || "");
  const [loading, setLoading] = useState(false);
  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImg(file);
    setFrontendImg(URL.createObjectURL(file));
  };
  const handleProfile = async () => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("userName", userName);
    formdata.append("bio", bio);
    formdata.append("profession", profession);
    formdata.append("gender", gender);
    if (backendImg) {
      formdata.append("profileImg", backendImg);
    }
    try {
      const res = await axios.post(
        `${serverUrl}/api/user/editProfile`,
        formdata,
        { withCredentials: true }
      );
      dispatch(setProfileData(res.data));
      dispatch(setUserData(res.data));
      navigate(`/profile/${userData.userName}`)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="w-full min-h-[100vh] bg-black flex flex-col items-center  gap-[20px] relative">
      <div className="w-full h-[50px] flex items-center gap-[20px] fixed left-[20px] px-[20px]">
        <div>
          <IoArrowBackSharp
            onClick={() => navigate(`/profile/${userData.userName}`)}
            className="text-white w-[25px] h-[25px] cursor-pointer"
          />
        </div>
        <h1 className="text-white text-[20px] font-semibold">Edit Profile</h1>
      </div>
      <div
        onClick={() => imageInput.current.click()}
        className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] border-2 border-black rounded-full cursor-pointer overflow-hidden mt-[60px] md:mt-[20px]"
      >
        <input
          type="file"
          accept="image/*"
          ref={imageInput}
          hidden
          onChange={handleImage}
        />
        <img src={frontendImg} alt="" className="w-full h-full object-cover" />
      </div>
      <div
        onClick={() => imageInput.current.click()}
        className="text-blue-500 text-center text-[18px] font-semibold cursor-pointer"
      >
        Change Your Profile Picture
      </div>

      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        className="w-[90%] max-w-[600px] h-[50px] bg--[#0a1010] border-2 border-gray-700 rounded-2xl px-[20px] outline-none text-white font-semibold"
        placeholder="Enter your name"
        value={name}
      />

      <input
        onChange={(e) => setUserName(e.target.value)}
        type="text"
        className="w-[90%] max-w-[600px] h-[50px] bg--[#0a1010] border-2 border-gray-700 rounded-2xl px-[20px] outline-none text-white font-semibold"
        placeholder="Enter your userName"
        value={userName}
      />

      <input
        onChange={(e) => setBio(e.target.value)}
        type="text"
        className="w-[90%] max-w-[600px] h-[50px] bg--[#0a1010] border-2 border-gray-700 rounded-2xl px-[20px] outline-none text-white font-semibold"
        placeholder="Enter your Bio"
        value={bio}
      />

      <input
        onChange={(e) => setProfession(e.target.value)}
        type="text"
        className="w-[90%] max-w-[600px] h-[50px] bg--[#0a1010] border-2 border-gray-700 rounded-2xl px-[20px] outline-none text-white font-semibold"
        placeholder="Enter your profession"
        value={profession}
      />

      <input
        onChange={(e) => setGender(e.target.value)}
        type="gender"
        className="w-[90%] max-w-[600px] h-[50px] bg--[#0a1010] border-2 border-gray-700 rounded-2xl px-[20px] outline-none text-white font-semibold"
        placeholder="Gender"
        value={gender}
      />

      <button
        onClick={handleProfile}
        className="px-[10px] w-[60%] max-w-[400px] py-[5px] h-[50px] bg-white cursor-pointer rounded-2xl font-semibold  text-center mb-[20px]"
        disabled={loading}
      >
        {loading ? <ClipLoader size={30} color="black" /> : "Save Profile"}
      </button>
    </div>
  );
};

export default EditProfile;
