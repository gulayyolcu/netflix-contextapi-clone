
import React, { useEffect, useState } from 'react'
import "./widgetSm.css"
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';

const WidgetSm = () => {

    const [newUsers,setNewUsers]=useState([])
    useEffect(()=>{
        const getNewUsers=async ()=>{
            try{
                const res=await axios.get("/users?new=true",{
                    headers:{
                        token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODA5NmQyMmNkMTBmMDMwMTk5NDZiMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNjI4Mjc3MiwiZXhwIjoxNjM2NzE0NzcyfQ.DxZlTUO5hd45t1-MNaZS5tn9I-WH1bszSlmybCSINz4"
                    }
                })
                setNewUsers(res.data)
            }catch(err){
                console.log(err)
            }
        }
        getNewUsers()
    },[])

    return (
        <div className="widgetSm">
           <span className="widgetSmTitle">New Join Members</span>
           <ul className="widgetSmList">
               {
                   newUsers.map((user)=>
                      (
                           <li className="widgetSmListItem">
                                <img src={user.profilePic || "https://images.pexels.com/photos/1793059/pexels-photo-1793059.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"} alt="" className="widgetSmImg" />
                                <div className="widgetSmUser">
                                    <span className="widgetSmUsername">{user.username}</span>
                                    <span className="widgetSmUserTitle">{user.email}</span>
                                </div>
                                <button className="widgetSmButton">
                                    <VisibilityIcon className="widgetSmIcon"/>Display
                                </button>
                            </li>
                       )
                )
               }
               
               
           
           </ul>
        </div>
    )
}

export default WidgetSm
