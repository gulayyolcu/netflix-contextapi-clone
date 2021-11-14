import React from 'react'
import "./user.css"
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import PublishIcon from '@mui/icons-material/Publish';
import {Link, useLocation,useHistory} from "react-router-dom"
import { useContext,useState } from 'react';
import { UserContext } from '../../context/userContext/UserContext'
import storage from "../../firebase"
import { updateUser } from '../../context/userContext/apiCalls';

const User = () => {
    const location=useLocation()
    const user=location.user

    const history=useHistory()

    const {dispatch}=useContext(UserContext)

    const [user1,setUser1]=useState(null)
    const [profilePic,setProfilePic]=useState(null)
    const [uploaded,setUploaded]=useState(0)

    const handleChange=(e)=>{
        const value=e.target.value
        setUser1({...user1,[e.target.name]:value})
    }

    const upload = (items) => {
        items.forEach((item) => {
          const fileName = new Date().getTime() + item.label + item.file.name;
          const uploadTask = storage.ref(`/users/${fileName}`).put(item.file);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
            },
            (error) => {
              console.log(error);
            },
            () => {
              uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                setUser1((prev) => {
                  return { ...prev, [item.label]: url };
                });
                setUploaded((prev) => prev + 1);
              });
            }
          );
        });
      };
    const handleUpload=(e)=>{
        e.preventDefault()
        upload([
            {file:profilePic,label:"profilePic"}
        ])
    }

    const handleUpdate=(id)=>{
        updateUser(id,user1,dispatch)
        history.push("/users")
    }

    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
                <Link to="/newUser">
                    <button className="userAddButton">Create</button>
                </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img src={user.profilePic} alt="" className="userShowImg" />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{user.username}</span>
                            <span className="userShowUserTitle">Developer</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <PermIdentityIcon className="userShowIcon"/>
                            <span className="userShowInfoTitle">{user.username}</span>
                        </div>
                        <div className="userShowInfo">
                            <CalendarTodayIcon className="userShowIcon"/>
                            <span className="userShowInfoTitle">12.10.1992</span>
                        </div>
                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo">
                            <PhoneAndroidIcon className="userShowIcon"/>
                            <span className="userShowInfoTitle">+90 555 44 33</span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutlineIcon className="userShowIcon"/>
                            <span className="userShowInfoTitle">{user.email}</span>
                        </div>
                        <div className="userShowInfo">
                            <LocationSearchingIcon className="userShowIcon"/>
                            <span className="userShowInfoTitle">Kayseri | TURKEY</span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Username</label>
                                <input type="text" placeholder={user.username} name="username" className="userUpdateInput" onChange={handleChange} />
                            </div>
                            <div className="userUpdateItem">
                                <label>Password</label>
                                <input type="password" placeholder={user.password} name="password" className="userUpdateInput" onChange={handleChange}/>
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input type="text" placeholder={user.email} name="email" className="userUpdateInput" onChange={handleChange}/>
                            </div>
                        <div className="userUpdateItem">
                            <label>Is Admin?</label>
                                <select name="isAdmin" id="active" className="newUserSelect" onChange={handleChange}>
                                    <option value="false">No</option>
                                    <option value="true">Yes</option>
                                </select>
                            </div> 
                            <div className="userUpdateItem">
                                <label>Profile Picture</label>
                                <input type="file" name="profilePic" onChange={(e)=>setProfilePic(e.target.files[0])}/>
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img src={user.profilePic} alt="" className="userUpdateImg" />
                                <label htmlFor="file">
                                    <PublishIcon className="userUpdateIcon"/>
                                </label>
                                <input type="file" id="file" style={{display:"none"}}/>
                            </div>
                            {
                                uploaded===1?(<button className="userUpdateButton" onClick={()=>handleUpdate(user._id)}>Update</button>):
                                (<button className="userUpdateButton" onClick={handleUpload}>Upload</button>)
                            }
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default User
