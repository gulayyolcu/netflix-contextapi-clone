import React,{useEffect} from 'react'
import "./userList.css"
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
//import {userRows} from '../../dummyData'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext/UserContext';
import { deleteUser, getUsers } from '../../context/userContext/apiCalls';

const UserList = () => {
  const { users, dispatch } = useContext(UserContext);

  const handleDelete = (id) => {
     deleteUser(id,dispatch)
   }; 
 
  
 
   console.log(users);
 
   useEffect(() => {
     getUsers(dispatch);
   }, [dispatch]);
   
   const columns = [
     { field: "_id", headerName: "ID", width: 150 },
     {
       field: "username",
       headerName: "Username",
       width: 130,
       renderCell: (params) => {
         return (
           <div className="userListUser">
             <img className="userListImg" src={params.row.profilePic} alt="" />
             {params.row.username}
           </div>
         );
       },
     },
     { field: "email", headerName: "Email", width: 170 },
     { field: "password", headerName: "Password", width: 350 },
     { field: "isAdmin", headerName: "IsAdmin", width: 130 },
 
     {
       field: "action",
       headerName: "Action",
       width: 150,
       renderCell: (params) => {
         return (
           <>
            <Link
               to={{ pathname: "/user/" + params.row._id, user: params.row }}
             >
               <button className="userListEdit">Edit</button>
             </Link>
             <DeleteOutlineIcon
               className="userListDelete"
               onClick={()=>handleDelete(params.row._id)}
 
             />
           </>
         );
       },
     },
   ];
 
   return (
     <div className="userList">
       <DataGrid
         rows={users}
         disableSelectionOnClick
         columns={columns}
         pageSize={8}
         checkboxSelection
         getRowId={(r) => r._id}
       />
     </div>
   );
}

export default UserList
