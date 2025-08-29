import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setFollowing } from '../redux/userSlice'
import { serverUrl } from '../App'

const useGetFollowingList = () => {
    const dispatch = useDispatch()
  useEffect(()=>{
     const fetchUser = async()=>{
        try {
            const res = await axios.get(`${serverUrl}/api/user/followingList`,{withCredentials:true})
            dispatch(setFollowing(res.data))
        } catch (error) {
            console.log(error)
        }
     }
     fetchUser()
  },[])
}

export default useGetFollowingList