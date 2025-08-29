import React, { useState } from "react";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import logo from "../assets/moodly.png";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../App";

const SignIn = () => {
  const [inputClick, setInputClick] = useState({
    userName: false,
    password: false,
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showpass, setShowpass] = useState(false);
  const [err, setErr] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/signIn`,
        {
          userName,
          password,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(res.data))
      setLoading(false);
      setUserName("");
      setPassword("");
    } catch (error) {
      setErr(error.response.data.message);
      setLoading(false);
      setUserName("");
      setPassword("");
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center">
      <div className="w-[90%] lg:max-w-[60%] h-[550px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23]">
        <div className="w-full lg:w-[50%] h-full bg-white flex flex-col items-center justify-center p-[10px] gap-[20px]">
          <div className="text-center text-[30px]">
            <p className="font-serif">
              Sign In To{" "}
              <span className="font-serif font-bold border-b-2 border-b-black text-cyan-400">
                Moodly
              </span>
            </p>
          </div>

          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black"
            onClick={() => setInputClick({ ...inputClick, userName: true })}
          >
            <label
              htmlFor="userName"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClick.userName ? "top-[-18px]" : ""
              }`}
            >
              Enter your userName
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
            />
          </div>

          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black"
            onClick={() => setInputClick({ ...inputClick, password: true })}
          >
            <label
              htmlFor="password"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClick.password ? "top-[-18px]" : ""
              }`}
            >
              Enter your password
            </label>
            <input
              type={showpass ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
            />
            {!showpass ? (
              <IoIosEye
                onClick={() => setShowpass(true)}
                className="absolute cursor-pointer right-[20px] w-[25px] h-[25px]"
              />
            ) : (
              <IoIosEyeOff
                onClick={() => setShowpass(false)}
                className="absolute cursor-pointer right-[20px] w-[25px] h-[25px]"
              />
            )}
          </div>

          <div
            onClick={() => navigate("/forgetPass")}
            className="w-[90%] px-[10px] cursor-pointer"
          >
            Forget Password
          </div>
          {err && <p className="text-red-500 font-semibold">{err}</p>}

          <button
            onClick={handleSignIn}
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl "
            disabled={loading}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Sign Up"}
          </button>
          <p className="cursor-pointer text-gray-800">
            Do Not have an account ?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="border-b-2 border-b-black pb-[3px] text-black"
            >
              Sign Up
            </span>
          </p>
        </div>
        <div className="md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#000000] flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black overflow-hidden relative">
          <img src={logo} alt="" className="w-full h-full" />
          <p className="absolute bottom-[70px] text-black">
            Moodly,Share your mood with style
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
