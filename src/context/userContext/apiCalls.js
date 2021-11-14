import axios from "axios"
/* import { createContext } from "react" */
import { createUserFailure, createUserStart, createUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, getUsersFailure, getUsersStart, getUsersSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "../userContext/UserActions"

export const getUsers=async (dispatch)=>{
    dispatch(getUsersStart())
    try{
       const res=await axios.get("/users/all",{
           headers:{
               token:"Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
           }
       }) 
        dispatch(getUsersSuccess(res.data))
    }catch(err){
        dispatch(getUsersFailure())
    }
}

 export const deleteUser=async (id,dispatch)=>{
    dispatch(deleteUserStart())
    try{
        await axios.delete("/users/"+id,{
            headers:{
                token:"Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(deleteUserSuccess(id))
    }catch(err){
        dispatch(deleteUserFailure())
    }
}

export const createUser=async (user,dispatch)=>{
    dispatch(createUserStart())
    try{
        const res=await axios.post("/auth/register/",user)
        dispatch(createUserSuccess(res.data))
    }catch(err){
        dispatch(createUserFailure())
    }
}


export const updateUser=async (id,user,dispatch)=>{
    dispatch(updateUserStart())
    try{
        const res=await axios.put("/users/"+id,user,{
            headers:{
                token:"Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(updateUserSuccess(res.data))
    }catch(err){
        dispatch(updateUserFailure())
    }
}