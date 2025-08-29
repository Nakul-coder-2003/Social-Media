import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setProfileData, setUserData } from "../redux/userSlice.js";
import { setSelectedUser } from "../redux/messageSlice.js";
import { IoArrowBackSharp } from "react-icons/io5";
import logo from "../assets/dp-logo.png";
import Navbar from "../components/Navbar.jsx";
import FollowButton from "../components/FollowButton.jsx";
import Post from "../components/Post.jsx";
import { serverUrl } from "../App.jsx";

const Profile = () => {
  const { userName } = useParams();
  const dispatch = useDispatch();
  const { profileData, userData } = useSelector((state) => state.user);
  const { postData } = useSelector((state) => state.post);
  const navigate = useNavigate();
  const [postType, setPostType] = useState("posts");
  const handleProfile = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/api/user/getProfile/${userName}`,
        { withCredentials: true }
      );
      // console.log(res.data);
      dispatch(setProfileData(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/auth/signOut`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleProfile();
  }, [userName]);

  return (
    <div className="w-full min-h-screen bg-black ">
      <div className="w-full h-[80px] flex  items-center justify-center px-[30px] bg-black text-white relative">
        <div>
          <IoArrowBackSharp
            onClick={() => navigate("/")}
            className="text-white w-[25px] h-[25px] absolute top-8 left-2"
          />
        </div>
        <div className="font-semibold cursor-pointer text-[20px] text-center">
          {profileData?.userName}
        </div>
        {profileData?._id == userData?._id &&  <div
          onClick={logout}
          className="font-semibold cursor-pointer text-[16px] text-blue-500 absolute top-6 right-2"
        >
          Log Out
        </div>}
       
      </div>
      <div className="w-full h-[150px] flex items-center justify-center gap-[20px] lg:gap-[30px] ">
        <div className="w-[80px] h-[80px] md:w-[110px] md:h-[110px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
          <img
            src={profileData?.profileImg || logo}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="font-semibold text-white text-[22px]">
            {profileData?.name}
          </div>
          <div className="font-semibold text-gray-400 text-[18px]">
            {profileData?.profession || "New User"}
          </div>
          <div className="text-[17px] text-[white]">{profileData?.bio}</div>
        </div>
      </div>
      <div className="w-full h-[100px] flex items-center justify-center gap-[40px] md:gap-[60px] pt-[10px] px-[20px] text-white">
        <div>
          <div className="text-white text-[22px] md:text-[30px] font-semibold">
            {profileData?.posts.length || 0}
          </div>
          <divext className="text-[18px] md:text-[22px] text-[#ffffffc7]">
            Posts
          </divext>
        </div>
        <div>
          <div className="flex items-center justify-center gap-[20px]">
            <div className="flex relative">
              {profileData?.followers?.slice(0, 3).map((user, index) => (
                <div
                  className={`w-[40px] h-[40px]  border-2 border-black rounded-full cursor-pointer overflow-hidden ${
                    index > 0 ? `absolute left-[${index * 9}px]` : ""
                  }`}
                >
                  <img
                    src={user?.profileImg || logo}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-white text-[22px] md:text-[30px] font-semibold">
              {profileData?.followers.length}
            </div>
          </div>
          <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">
            Followers
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center gap-[20px]">
            <div className="flex relative">
              {profileData?.following?.slice(0, 3).map((user, index) => (
                <div
                  className={`w-[40px] h-[40px]  border-2 border-black rounded-full cursor-pointer overflow-hidden ${
                    index > 0 ? `absolute left-[${index * 9}px]` : ""
                  }`}
                >
                  <img
                    src={user?.profileImg || logo}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-white text-[22px] md:text-[30px] font-semibold">
              {profileData?.following.length}
            </div>
          </div>
          <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">
            Following
          </div>
        </div>
      </div>
      <div className="w-full h-[80px] flex justify-center items-center gap-[20px] mt-[10px]">
        {profileData?._id === userData._id && (
          <>
            <button
              onClick={() => navigate("/editprofile")}
              className="px-[10px] min-w-[150px] py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl font-semibold"
            >
              Edit Profile
            </button>
          </>
        )}

        {profileData?._id != userData?._id && (
          <>
            <FollowButton
              tailwind={
                "px-[10px] w-[100px] py-[5px] h-[40px] bg-white rounded-2xl flex items-center justify-center cursor-pointer font-semibold"
              }
              targetUserId={profileData?._id}
            />
            <button
              onClick={() => {
                dispatch(setSelectedUser(profileData));
                navigate("/messages");
              }}
              className="px-[20px]  py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl font-semibold"
            >
              Message
            </button>
          </>
        )}
      </div>
      <div className="w-full min-h-[100vh] flex justify-center">
        <div className="w-full max-w-[600px] flex flex-col items-center rounded-t-[30px] bg-white relative gap-[20px] pt-[30px]">
          <Navbar />

          {profileData?._id == userData._id && (
            <div className="w-[90%] md:w-[600px] h-[60px]  bg-white rounded-full flex justify-center items-center gap-[10px]">
              <div
                onClick={() => setPostType("posts")}
                className={`${
                  postType == "posts"
                    ? "bg-black shadow-2xl shadow-black text-white"
                    : ""
                } w-[28%] h-[80%] flex justify-center items-center text-[19px] border-2 border-black font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
              >
                Posts
              </div>

              <div
                onClick={() => setPostType("saved")}
                className={`${
                  postType == "saved"
                    ? "bg-black shadow-2xl shadow-black text-white"
                    : ""
                } w-[28%] h-[80%] flex justify-center items-center text-[19px] border-2 border-black font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black`}
              >
                Saved
              </div>
            </div>
          )}

          {profileData?._id == userData._id && (
            <>
              {postType == "posts" &&
                postData?.map(
                  (post) =>
                    post?.author?._id == profileData?._id && (
                      <Post post={post} />
                    )
                )}
              {postType == "saved" &&
                postData?.map(
                  (post, index) =>
                    userData.saved.includes(post._id) && <Post post={post} />
                )}
            </>
          )}

          {profileData?._id != userData._id &&
            postData?.map(
              (post) =>
                post?.author?._id == profileData?._id && <Post post={post} />
            )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
