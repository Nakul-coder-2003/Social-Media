import React, { useContext, useEffect, useRef, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../assets/dp-logo.png";
import { LuImage } from "react-icons/lu";
import { LuSendHorizontal } from "react-icons/lu";
import axios from "axios";
import { setMessages } from "../redux/messageSlice";
import Sender from "../components/Sender";
import Receiver from "../components/Receiver";
import { serverUrl } from "../App";

const Messages = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const { selectedUser, messages } = useSelector((state) => state.message);
  const { userData } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.socket);
  const inputImg = useRef();
  const [frontendImg, setFrontendImg] = useState(null);
  const [backendImg, setBackendImg] = useState(null);
  const handleImg = (e) => {
    const file = e.target.files[0];
    setBackendImg(file);
    setFrontendImg(URL.createObjectURL(file));
  };

  const handleSendMess = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("message", input);
    if (backendImg) {
      formData.append("image", backendImg);
    }
    try {
      const res = await axios.post(
        `${serverUrl}/api/message/send/${selectedUser?._id}`,
        formData,
        { withCredentials: true }
      );
      dispatch(setMessages([...messages, res.data]));
      setInput("");
      setBackendImg(null);
      setFrontendImg(null);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllMessages = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/api/message/getAll/${selectedUser?._id}`,
        { withCredentials: true }
      );
      dispatch(setMessages(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  useEffect(() => {
    socket.on("newMessage", (mess) => {
      dispatch(setMessages([...messages, mess]));
    });
    return () => socket.off("newMessage");
  }, [messages, setMessages]);

  return (
    <div className="w-full min-h-screen bg-black flex flex-col relative">
      <div className="w-full h-[15%%] fixed top-0 flex items-center gap-[20px] px-[30px] py-[18px] bg-black text-white border-b-2 border-b-gray-600 z-[100]">
        <div>
          <IoArrowBackSharp
            onClick={() => navigate("/")}
            className="text-white w-[25px] h-[25px] "
          />
        </div>
        <div className="flex items-center gap-[10px]">
          <div
            onClick={() => navigate(`/profile/${selectedUser?.userName}`)}
            className="w-[50px] h-[50px] border-2 border-black rounded-full cursor-pointer overflow-hidden"
          >
            <img
              src={selectedUser?.profileImg || logo}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-[16px] text-white font-semibold">
              {selectedUser?.userName}
            </div>
            <div className="text-[12px] text-gray-400 font-semibold">
              {selectedUser?.name}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[65%] flex-1 pt-[100px] pb-[160px]  px-[40px] flex flex-col gap-[50px] overflow-auto ">
        {messages &&
          messages.map((mess, index) =>
            mess.sender == userData._id ? (
              <Sender mess={mess} />
            ) : (
              <Receiver mess={mess} />
            )
          )}
      </div>

      <div className="w-full h-[10%] md:h-[15%] fixed bottom-0 flex justify-center items-center bg-black z-[100]">
        <form
          onSubmit={handleSendMess}
          className="w-[90%] max-w-[800px] h-[80%] rounded-full bg-[#1c3e3e] flex items-center gap-[8px] px-[20px] relative"
        >
          {frontendImg && (
            <div className="w-[100px] h-[100px] rounded-2xl absolute top-[-120px] right-[-10px] overflow-hidden">
              <img src={frontendImg} alt="" className="h-full object-cover" />
            </div>
          )}
          <input
            type="file"
            hidden
            ref={inputImg}
            accept="image/*"
            onChange={handleImg}
          />
          <img
            src={userData?.profileImg || logo}
            alt="profile"
            onClick={() => navigate(`/profile/${userData?.userName}`)}
            className="w:8 h:8 md:w-10 md:h-10 rounded-full border border-gray-400 object-cover cursor-pointer"
          />
          <input
            type="text"
            placeholder="Messages.."
            className="flex-1 px-3  text-sm md:text-[18px] text-white outline-0"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <div onClick={() => inputImg.current.click()}>
            <LuImage className="w-[16px] h-[16px] md:w-[25px] md:h-[25px] text-white cursor-pointer" />
          </div>
          {(input || frontendImg) && (
            <button className="w-[30px] h-[30px] md:w-[60px] md:h-[40px] rounded-full bg-gradient-to-br from-[#9500ff] to-[#ff0095] flex items-center justify-center">
              <LuSendHorizontal className="w-[16px] h-[16px] md:w-[22px] md:h-[22px] text-white font-bold cursor-pointer" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Messages;
