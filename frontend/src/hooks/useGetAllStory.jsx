import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App';
import { setStoryList } from '../redux/storySlice';

const useGetAllStory = () => {
    const dispatch = useDispatch()
    const {userData} = useSelector(state => state.user)
    const {storyData} = useSelector(state => state.story)
  useEffect(()=>{
     const fetchUser = async()=>{
        try {
            const res = await axios.get(`${serverUrl}/api/story/getAll`,{withCredentials:true})
            dispatch(setStoryList(res.data))
        } catch (error) {
            console.log(error)
        }
     }
     fetchUser()
  },[userData,storyData])
}

export default useGetAllStory