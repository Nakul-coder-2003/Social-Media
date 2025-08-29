import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgetPassword from "./pages/ForgetPassword";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Uploadmedia from "./pages/Uploadmedia";
import Reels from "./pages/Reels";
import Messages from "./pages/Messages";
import { useEffect } from "react";
import io from "socket.io-client";
import { setOnlineUsers, setSocket } from "./redux/socketSlice";
import MessageBox from "./pages/MessageBox";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import useGetSuggestedUser from "./hooks/useGetSuggestedUser";
import useGetAllPost from "./hooks/useGetAllPost";
import useGetAllReel from "./hooks/useGetAllReel";
import useGetFollowingList from "./hooks/useGetFollowingList";
import useGetPrevChats from "./hooks/useGetPrevChats";
import Story from "./pages/Story";
import useGetAllStory from "./hooks/useGetAllStory";
import Search from "./pages/Search";

export const serverUrl = "https://social-media-backendproject.onrender.com";
const App = () => {
  useGetCurrentUser();
  useGetSuggestedUser();
  useGetAllPost();
  useGetAllReel();
  useGetFollowingList();
  useGetPrevChats();
  useGetAllStory();
  const { userData } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      const socketIo = io(`${serverUrl}`, {
        query: { userId: userData?._id },
      });
      dispatch(setSocket(socketIo));
      socketIo.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
        console.log(users);
      });
      return () => socketIo.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [userData]);

  return (
    <div>
      <Routes>
        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signin"
          element={!userData ? <SignIn /> : <Navigate to={"/"} />}
        />
        <Route
          path="/forgetPass"
          element={!userData ? <ForgetPassword /> : <Navigate to={"/"} />}
        />
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/profile/:userName"
          element={userData ? <Profile /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/editprofile"
          element={userData ? <EditProfile /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/uploadmedia"
          element={userData ? <Uploadmedia /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/reels"
          element={userData ? <Reels /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/messages"
          element={userData ? <Messages /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/messageBox"
          element={userData ? <MessageBox /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/story/:userName"
          element={userData ? <Story /> : <Navigate to={"/signin"} />}
        />
        <Route
          path="/search"
          element={userData ? <Search /> : <Navigate to={"/signin"} />}
        />
      </Routes>
    </div>
  );
};

export default App;
