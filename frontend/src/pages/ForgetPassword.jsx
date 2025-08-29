import React, { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { serverUrl } from "../App";

const ForgetPassword = () => {
  const [inputClick, setInputClick] = useState({
    email: false,
    otp: false,
    resetPass: false,
    confirmResetPass: false,
  });
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resetPass, setResetPass] = useState("");
  const [confirmResetPass, setConfirmResetPass] = useState("");
  const [showpass, setShowpass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [err,setErr] = useState("")

  const handleStep1 = async () => {
    setLoading(true)
    setErr("")
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/sendotp`,
        {
          email,
        },
        { withCredentials: true }
      );
      console.log(res)
      setLoading(false)
      setStep(2)
    } catch (error) {
       setErr(error.response.data.message)
       setLoading(false)
    }
  };

  const handleStep2 = async()=>{
    setLoading(true)
    setErr("")
    try {
      const res = await axios.post(`${serverUrl}/api/auth/varifyOtp`,{email,otp},{withCredentials:true});
      console.log(res)
      setLoading(false)
      setStep(3)
    } catch (error) {
      setErr(error.response.data.message)
      setLoading(false)
    }
  }

  const handleStep3 = async()=>{
    setLoading(true)
    setErr("")
   try {
    if(resetPass !== confirmResetPass){
      return console.log("password does not match")
    }
    const res = await axios.post(`${serverUrl}/api/auth/resetPass`,{email,password:resetPass},{withCredentials:true})
    console.log(res)
    setLoading(false)
   } catch (error) {
    setErr(error.response.data.message)
    setLoading(false)
   }
  }

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center">
      {step == 1 && (
        <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex items-center justify-center flex-col border-[#1a1f23]">
          <h2 className="text-[30px] font-semibold">Forget Password</h2>
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[20px] border-2 border-black"
            onClick={() => setInputClick({ ...inputClick, email: true })}
          >
            <label
              htmlFor="email"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClick.email ? "top-[-18px]" : ""
              }`}
            >
              Enter your Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
            />
          </div>
          {err && <p className="text-red-500 font-semibold">{err}</p>}
          <button
            onClick={handleStep1}
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]"
            disabled={loading}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Send OTP"}
          </button>
        </div>
      )}

      {step == 2 && (
        <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex items-center justify-center flex-col border-[#1a1f23]">
          <h2 className="text-[30px] font-semibold">Varify OTP</h2>
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[20px] border-2 border-black"
            onClick={() => setInputClick({ ...inputClick, otp: true })}
          >
            <label
              htmlFor="otp"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClick.otp ? "top-[-18px]" : ""
              }`}
            >
              Enter your OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
            />
          </div>
          {err && <p className="text-red-500 font-semibold">{err}</p>}
          <button
            onClick={handleStep2}
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]"
            disabled={loading}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Verify OTP"}
          </button>
        </div>
      )}

      {step == 3 && (
        <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex items-center justify-center flex-col border-[#1a1f23]">
          <h2 className="text-[30px] font-semibold">Reset Password</h2>
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[20px] border-2 border-black"
            onClick={() => setInputClick({ ...inputClick, resetPass: true })}
          >
            <label
              htmlFor="reset-password"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClick.resetPass ? "top-[-18px]" : ""
              }`}
            >
              reset-password
            </label>
            <input
              type={showpass ? "text" : "password"}
              id="reset-password"
              value={resetPass}
              onChange={(e) => setResetPass(e.target.value)}
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
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[20px] border-2 border-black"
            onClick={() =>
              setInputClick({ ...inputClick, confirmResetPass: true })
            }
          >
            <label
              htmlFor="confirmReset-password"
              className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${
                inputClick.confirmResetPass ? "top-[-18px]" : ""
              }`}
            >
              confirm-reset-password
            </label>
            <input
              type={showpass ? "text" : "password"}
              id="reset-password"
              value={confirmResetPass}
              onChange={(e) => setConfirmResetPass(e.target.value)}
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
          {err && <p className="text-red-500 font-semibold">{err}</p>}
          <button
            onClick={handleStep3}
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]"
            disabled={loading}
          >
            {loading ? (
              <ClipLoader size={30} color="white" />
            ) : (
              "Reset-Password"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
