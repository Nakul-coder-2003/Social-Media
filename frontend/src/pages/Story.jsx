import React, { useEffect } from 'react'
import StoryCard from '../components/StoryCard'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setStoryData } from '../redux/storySlice'

const Story = () => {
    const {userName} = useParams()
    const dispatch = useDispatch()
    const {storyData} = useSelector(state => state.story)
    const handleStory = async()=>{
        try {
            const res = await axios.get(`${serverUrl}/api/story/getstorybyusername/${userName}`,{withCredentials:true})
            dispatch(setStoryData(res.data[0]))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        if(userName){
            handleStory()
        }
    },[userName])
  return (
    <div className='w-full h-[100vh] bg-black flex justify-center items-center'>
        <StoryCard storyData={storyData}/>
    </div>
  )
}

export default Story