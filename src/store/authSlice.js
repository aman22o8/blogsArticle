import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState={
    status:false,
    userData:null
}



const authSlice=createSlice({
        name:'auth',
        initialState:initialState,
        reducers:{
            login:(state,action)=>{
                
                console.log("my action is ",action)
                state.status=true,
                state.userData=action.payload

            },
            logout:(state)=>{
                state.status=false,
                state.userData=null
            }
        }
})

export const {login,logout}=authSlice.actions
export default authSlice.reducer