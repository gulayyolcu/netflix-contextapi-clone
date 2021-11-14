import React, { useContext, useEffect } from 'react'
import "./productList.css"
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
/* import {productRows} from '../../dummyData' */
import { Link } from 'react-router-dom';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { deleteMovie, getMovies} from '../../context/movieContext/apiCalls';

const ProductList = () => {
    //const [data,setData]=useState(productRows)
    const {movies,dispatch}=useContext(MovieContext)

    const handleDelete=(id)=>{
        //setData(data.filter((item)=>item.id!==id))
        deleteMovie(id,dispatch)
    }

    useEffect(()=>{
        getMovies(dispatch)
    },[dispatch])

    console.log(movies)

    const columns = [
        { field: '_id', headerName: 'ID', width: 170 },
        {
            field: "movie",
            headerName: "Movie",
            width: 200,
            renderCell: (params) => {
              return (
                <div className="productListItem">
                  <img className="productListImg" src={params.row.img} alt="" />
                  {params.row.title}
                </div>
              );
            },
          },
        { field: 'genre', headerName: 'Genre',width: 120 },
        { field: 'year', headerName: 'Year',width: 120 },
        { field: 'limit', headerName: 'Limit',width: 120 },
        { field: 'isSeries', headerName: 'isSeries',width: 120 },
        {
            field:"action",
            headerName:"Action",
            width:150,
            renderCell:(params)=>{
                return(
                    <>
                        <Link to={{pathname:"/movie/"+params.row._id,movie:params.row}}>
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
            <DataGrid rows={movies} columns={columns} pageSize={8} rowsPerPageOptions={[5]}
            getRowId={(r)=>r._id}
            disableSelectionOnClick checkboxSelection/>
        </div>
    )
}

export default ProductList
