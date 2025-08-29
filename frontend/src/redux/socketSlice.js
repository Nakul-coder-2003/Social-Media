import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
    name:"socket",
    initialState:{
        onlineUser:null,
        socket:null
    },
    reducers:{
        setOnlineUsers: (state,action)=>{
            state.onlineUser = action.payload;
        },
        setSocket: (state,action)=>{
            state.socket = action.payload;
        }
    }
})

export const {setOnlineUsers,setSocket} = socketSlice.actions;
export default socketSlice.reducer;