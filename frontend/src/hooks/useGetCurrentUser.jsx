import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { serverUrl } from '../App'

const useGetCurrentUser = () => {
    const dispatch = useDispatch()
    const {storyData} = useSelector(state => state.story)
  useEffect(()=>{
     const fetchUser = async()=>{
        try {
            const res = await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
            dispatch(setUserData(res.data))
        } catch (error) {
            console.log(error)
        }
     }
     fetchUser()
  },[storyData])
}

export default useGetCurrentUser