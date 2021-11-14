import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import "./newUser.css"
import { UserContext } from '../../context/userContext/UserContext'
import storage from "../../firebase"
import { createUser } from '../../context/userContext/apiCalls'


const NewUser = () => {
    const [user,setUser]=useState(null)
    const [profilePic,setProfilePic]=useState("")
    const [uploaded,setUploaded]=useState(0)

    const {dispatch}=useContext(UserContext)

    const handleChange=(e)=>{
        const value=e.target.value
        setUser({...user,[e.target.name]:value})
    }

    const upload = (items) => {
        items.forEach((item) => {
          const fileName = new Date().getTime() + item.label + item.file.name;
          const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
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
                setUser((prev) => {
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

    const handleSubmit=(e)=>{
        e.preventDefault()
        createUser(user,dispatch)
    }

    return (
        <div className="newUser">
            <h1 className="newUserTitle">New User</h1>
            <form className="newUserForm">
                <div className="newUserItem">
                    <label>Username</label>
                    <input type="text" placeholder="john" name="username" onChange={handleChange}/>
                </div>
               {/*  <div className="newUserItem">
                    <label>Fullname</label>
                    <input type="text" placeholder="john smith" />
                </div> */}
                <div className="newUserItem">
                    <label>Email</label>
                    <input type="email" placeholder="john@gmail.com" name="email" onChange={handleChange}/>
                </div>
                <div className="newUserItem">
                    <label>Password</label>
                    <input type="password" placeholder="password" name="password" onChange={handleChange}/>
                </div>
              {/*   <div className="newUserItem">
                    <label>Phone</label>
                    <input type="text" placeholder="+90 555 555 5555" />
                </div>
                <div className="newUserItem">
                    <label>Address</label>
                    <input type="text" placeholder="New York | USA" />
                </div> */}
                <div className="newUserItem">
                    <label>Profile Picture</label>
                    <input type="file" name="profilePic" onChange={(e)=>setProfilePic(e.target.files[0])}/>
                </div> 
               {/*  <div className="newUserItem">
                    <label>Gender</label>
                    <div className="newUserGender">
                        <input type="radio"  id="male" value="male" />
                        <label for="male">Male</label>
                        <input type="radio" id="female" value="female" />
                        <label for="Female">Female</label>
                    </div>
                </div> */}
                <div className="newUserItem">
                    <label>Is Admin?</label>
                    <select name="isAdmin" id="active" className="newUserSelect" onChange={handleChange}>
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                </div>
                <div className="newUserItem">
                {
                    uploaded!==1?(
                        <button className="newUserButton" onClick={handleUpload}>
                            Create
                        </button>
                    ):(
                        <button className="newUserButton" onClick={handleSubmit}>
                            Create
                        </button>
                    )
                }
                
                </div>
            </form>
        </div>
    )
}

export default NewUser
