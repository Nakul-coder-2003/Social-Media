import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setReelData } from "../redux/reelSlice";
import { serverUrl } from '../App';

const useGetAllReel = () => {
    const dispatch = useDispatch()
  useEffect(()=>{
     const fetchUser = async()=>{
        try {
            const res = await axios.get(`${serverUrl}/api/reel/getAllreel`,{withCredentials:true})
            dispatch(setReelData(res.data))
        } catch (error) {
            console.log(error)
        }
     }
     fetchUser()
  },[dispatch])
}

export default useGetAllReel