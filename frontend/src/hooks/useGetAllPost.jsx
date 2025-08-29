import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPostData } from "../redux/postSlice";
import { serverUrl } from '../App';

const useGetAllPost = () => {
    const dispatch = useDispatch()
    const {userData} = useSelector(state => state.user)
  useEffect(()=>{
     const fetchUser = async()=>{
        try {
            const res = await axios.get(`${serverUrl}/api/post/getAllpost`,{withCredentials:true})
            dispatch(setPostData(res.data))
        } catch (error) {
            console.log(error)
        }
     }
     fetchUser()
  },[dispatch,userData])
}

export default useGetAllPost