import React, { useContext, useEffect } from 'react'
import "./listList.css"
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
/* import {productRows} from '../../dummyData' */
import { Link } from 'react-router-dom';
import { ListContext } from '../../context/listContext/ListContext';
import { deleteList, getLists} from '../../context/listContext/apiCalls';

const ListList = () => {
    //const [data,setData]=useState(productRows)
    const {lists,dispatch}=useContext(ListContext)

    const handleDelete=(id)=>{
        //setData(data.filter((item)=>item.id!==id))
        deleteList(id,dispatch)
    }/*  */

    useEffect(()=>{
        getLists(dispatch)
    },[dispatch])

    console.log(lists)

    const columns = [
        { field: '_id', headerName: 'ID', width: 170 },
        { field: 'genre', headerName: 'Genre',width: 120 },
        { field: 'title', headerName: 'Title',width: 120 },
        { field: 'type', headerName: 'Type',width: 120 },
       
        {
            field:"action",
            headerName:"Action",
            width:150,
            renderCell:(params)=>{
                return(
                    <>
                        <Link to={{pathname:"/list/"+params.row._id,list:params.row}}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        
                        <DeleteOutlineIcon className="productListDelete" onClick={()=>handleDelete(params.row._id)}/>
                    </>
                )
            }
        }
      ];

    return (
        <div className="productList">
            <DataGrid rows={lists} columns={columns} pageSize={8} rowsPerPageOptions={[5]}
            getRowId={(r)=>r._id}
            disableSelectionOnClick checkboxSelection/>
        </div>
    )
}

export default ListList
