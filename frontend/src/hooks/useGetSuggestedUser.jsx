import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSuggestedUser, setUserData } from '../redux/userSlice'
import { serverUrl } from '../App'

const useGetSuggestedUser = () => {
    const dispatch = useDispatch()
    const {userData} = useSelector(state => state.user) 
  useEffect(()=>{
     const fetchUser = async()=>{
        try {
            const res = await axios.get(`${serverUrl}/api/user/suggested`,{withCredentials:true})
            dispatch(setSuggestedUser(res.data))
        } catch (error) {
            console.log(error)
        }
     }
     fetchUser()
  },[userData])
}

export default useGetSuggestedUser