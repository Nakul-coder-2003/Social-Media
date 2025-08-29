import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App'
import { toggleFollow } from '../redux/userSlice'

const FollowButton = ({targetUserId,tailwind}) => {
  const {following} = useSelector(state => state.user)
  const isFollowing = following?.includes(targetUserId)
  const dispatch = useDispatch()
  const handleFollow = async()=>{
    try {
      const res = await axios.get(`${serverUrl}/api/user/follow/${targetUserId}`,{withCredentials:true})
       dispatch(toggleFollow(targetUserId))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <button onClick={handleFollow} className={tailwind}>
        {isFollowing?"Following":"Follow"}
    </button>
  )
}

export default FollowButton