import React, { useState } from 'react'
import "./list.css"
import storage from "../../firebase"
import {Link, useLocation,useHistory} from "react-router-dom"
/* import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData" */
import PublishIcon from '@mui/icons-material/Publish';
import { useContext } from 'react'
import { MovieContext } from '../../context/movieContext/MovieContext'
import { updateMovie } from '../../context/movieContext/apiCalls'

const List = () => {
    const location=useLocation()
    const list=location.list

    const history=useHistory()

    const {dispatch}=useContext(MovieContext)

    const [movie1,setMovie1]=useState(null);
    const [img,setImg]=useState(null)
    const [uploaded,setUploaded]=useState(0)
    
    const handleChange=(e)=>{
        const value=e.target.value
        setMovie1({...movie1,[e.target.name]:value})
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
                setMovie1((prev) => {
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
            {file:img,label:"img"}
        ])
    }

    const handleUpdate=(id)=>{
    
        updateMovie(id,movie1,dispatch)
        history.push("/movies")
    }


    return (
        <div className="product">
           <div className="productTitlecontainer">
                <h1 className="productTitle">List</h1>
                <Link to="/newList">
                    <button className="productAddButton">Create</button>
                </Link>
            </div> 
            <div className="productTop">

                <div className="productTopRight">
                   
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">Id:</span>
                            <span className="productInfoValue">{list._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Title</span>
                            <span className="productInfoValue">{list.title}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Genre</span>
                            <span className="productInfoValue">{list.genre}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Type</span>
                            <span className="productInfoValue">{list.type}</span>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>List Title</label>
                        <input type="text" name="title" placeholder={list.title} onChange={handleChange}/>
                        <label>Genre</label>
                        <input type="text" name="genre" placeholder={list.genre} onChange={handleChange}/>
                        <label>Type</label>
                        <input type="text" name="type" placeholder={list.type} onChange={handleChange}/>
                      
                    </div>
                    <div className="productFormRight">
                    <button className="productButton" onClick={()=>handleUpdate(list._id)}>Update</button>
                       {/*  {
                            uploaded===1?(<button className="productButton" onClick={()=>handleUpdate(movie._id)}>Update</button>):(<button className="productButton" onClick={handleUpload}>Upload</button>)
                        } */}
                        
                       
                    </div>
                </form>
            </div>
        </div>
    )
}

export default List
