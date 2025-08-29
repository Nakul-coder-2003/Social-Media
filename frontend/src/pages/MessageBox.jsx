import React from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OnlineUser from "../components/OnlineUser";
import { setSelectedUser } from "../redux/messageSlice";
import dp from "../assets/dp-logo.png";

const MessageBox = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const { onlineUser } = useSelector((state) => state.socket);
  const { prevUserChat } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  return (
    <div className="w-full min-h-screen flex flex-col bg-black gap-4 p-4">
      <div className="w-full h-[50px] flex items-center gap-4 sticky top-0 bg-black z-10">
        <IoArrowBackSharp
          onClick={() => navigate(`/`)}
          className="text-white w-6 h-6 cursor-pointer lg:hidden"
        />
        <h1 className="text-white text-lg font-semibold">Messages</h1>
      </div>
      {/*map online users */}
      <div className="w-full h-[80px] flex gap-[20px] justify-start items-center overflow-x-auto p-[10px] border-b-2 border-gray-700">
        {userData.following?.map(
          (user, index) =>
            onlineUser?.includes(user._id) && <OnlineUser user={user} />
        )}
      </div>
      {/*previous  users maps*/}
      <div className="w-full h-full overflow-auto flex flex-col gap-[20px]">
        {prevUserChat?.map((user, index) => (
          <div
            onClick={() => {
              dispatch(setSelectedUser(user));
              navigate("/messages");
            }}
            className="text-white cursor-pointer w-full flex items-center gap-[10px] border-b-2 border-gray-600 py-[8px]"
          >
            {onlineUser?.includes(user._id) ? (
              <OnlineUser user={user} />
            ) : (
              <div className="w-[50px] h-[50px] border-2 border-black rounded-full cursor-pointer flex items-center justify-center overflow-hidden">
                <img
                  src={user?.profileImg || dp}
                  alt=""
                  className="w-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-col">
              <div className="text-white text-[18px] font-semibold">
                {user.userName}
              </div>
              {onlineUser?.includes(user?._id) && (
                <div className="text-blue-500">Active Now</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageBox;
