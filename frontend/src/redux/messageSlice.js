import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name:"message",
    initialState:{
        selectedUser:null,
        messages:[],
        prevUserChat:null
    },
    reducers:{
        setSelectedUser: (state,action)=>{
            state.selectedUser = action.payload;
        },
        setMessages: (state,action)=>{
            state.messages = action.payload;
        },
        setPrevChat: (state,action)=>{
            state.prevUserChat = action.payload;
        },
    }
})

export const {setSelectedUser,setMessages,setPrevChat} = messageSlice.actions;
export default messageSlice.reducer;