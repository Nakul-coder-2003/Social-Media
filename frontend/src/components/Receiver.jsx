import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Receiver = ({ mess }) => {
  const { selectedUser } = useSelector((state) => state.message);
  const scroller = useRef();
  useEffect(() => {
    scroller.current.scrollIntoView({ behavior: "smooth" });
  }, [mess.message, mess.image]);
  return (
    <div
      ref={scroller}
      className="w-fit max-w-[60%] bg-[#3d4444] rounded-t-2xl rounded-br-2xl rounded-bl-0 px-[10px] py-[10px] relative mr-auto left-0"
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
      <div className="w-[30px] h-[30px] rounded-full cursor-pointer overflow-hidden absolute left-[-20px] bottom-[-35px] flex items-center justify-center">
        <img src={selectedUser?.profileImg} alt="" />
      </div>
    </div>
  );
};

export default Receiver;
