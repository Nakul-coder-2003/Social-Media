import React, { useEffect, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setSearchData } from "../redux/userSlice";
import FollowButton from "../components/FollowButton";

const Search = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const { searchData } = useSelector((state) => state.user);
  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/api/user/search?keyword=${input}`,
        { withCredentials: true }
      );
      dispatch(setSearchData(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [input]);

  return (
    <div className="w-full min-h-[100vh] bg-black flex flex-col items-center  gap-[20px] relative">
      <div className="w-full h-[50px] flex items-center gap-[20px] fixed left-[20px] px-[20px]">
        <div>
          <IoArrowBackSharp
            onClick={() => navigate(`/`)}
            className="text-white w-[25px] h-[25px] cursor-pointer"
          />
        </div>
        <h1 className="text-white text-[20px] font-semibold">Search</h1>
      </div>
      <div className="w-full h-[80px] flex items-center justify-center mt-[60px] md:mt-[30px]">
        <form className="w-[90%] max-w-[800px] h-[80%]  rounded-full bg-gray-600 flex items-center gap-[10px] px-[20px]">
          <IoSearch className="w-[20px] h-[20px] text-white" />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="search..."
            className="text-white text-[20px] w-full h-full outline-0 rounded-full px-[10px]"
          />
        </form>
      </div>

      {input &&
        searchData?.map((user) => (
          <div className="w-[90vw] max-w-[500px] h-[70px] rounded-full bg-white flex items-center gap-[10px] justify-between px-[20px]">
            <div
              onClick={() => navigate(`/profile/${user?.userName}`)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <img
                src={user?.profileImg}
                alt="profile"
                className="w-12 h-12 rounded-full border border-gray-400 object-cover cursor-pointer"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">
                  {user?.userName}
                </span>
                <span className="font-semibold text-gray-800">
                  {user?.name}
                </span>
              </div>
            </div>
            <FollowButton
              tailwind={
                "px-[10px] w-[100px] py-[5px] h-[40px] bg-black text-white rounded-2xl flex items-center justify-center font-semibold cursor-pointer border-2 border-black"
              }
              targetUserId={user._id}
            />
          </div>
        ))}

        {!input && <div className="text-white font-semibold text-center mt-[20px] text-2xl">Search Here...</div>}
    </div>
  );
};

export default Search;
