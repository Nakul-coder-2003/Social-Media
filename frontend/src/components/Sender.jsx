import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Sender = ({ mess }) => {
  const { userData } = useSelector((state) => state.user);
  const scroller = useRef();
  useEffect(() => {
    scroller.current.scrollIntoView({ behavior: "smooth" });
  }, [mess.message, mess.image]);
  return (
    <div
      ref={scroller}
      className="w-fit max-w-[60%] bg-gradient-to-br from-[#9500ff] to-[#ff0095] rounded-t-2xl rounded-bl-2xl px-[10px] py-[10px] relative ml-auto right-0"
    >
      {mess.image && (
        <img
          src={mess.image}
          alt=""
          className="h-[200px] object-center rounded-2xl"
        />
      )}

      {mess.message && (
        <div className="text-white text-[18px] ">{mess.message}</div>
      )}
      <div className="w-[30px] h-[30px] rounded-full cursor-pointer overflow-hidden absolute right-[-20px] bottom-[-35px] flex items-center justify-center">
        <img src={userData?.profileImg} alt="" />
      </div>
    </div>
  );
};

export default Sender;
