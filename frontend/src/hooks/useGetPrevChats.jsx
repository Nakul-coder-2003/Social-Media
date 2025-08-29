import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPrevChat } from '../redux/messageSlice'
import { serverUrl } from '../App'

const useGetPrevChats = () => {
    const dispatch = useDispatch()
   const { messages } = useSelector((state) => state.message);
  useEffect(()=>{
     const fetchUser = async()=>{
        try {
            const res = await axios.get(`${serverUrl}/api/message/prevChats`,{withCredentials:true})
            dispatch(setPrevChat(res.data))
        } catch (error) {
            console.log(error)
        }
     }
     fetchUser()
  },[messages])
}

export default useGetPrevChats