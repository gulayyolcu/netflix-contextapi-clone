import React, { useState } from 'react'
import "./product.css"
import storage from "../../firebase"
import {Link, useLocation,useHistory} from "react-router-dom"
/* import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData" */
import PublishIcon from '@mui/icons-material/Publish';
import { useContext } from 'react'
import { MovieContext } from '../../context/movieContext/MovieContext'
import { updateMovie } from '../../context/movieContext/apiCalls'

const Product = () => {
    const location=useLocation()
    const movie=location.movie

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
                <h1 className="productTitle">Movie</h1>
                <Link to="/newProduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div> 
            <div className="productTop">

                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={movie.imgSm} alt="" className="productInfoImg" />
                        <span className="productName">{movie.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">Id:</span>
                            <span className="productInfoValue">{movie._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Year</span>
                            <span className="productInfoValue">{movie.year}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Genre</span>
                            <span className="productInfoValue">{movie.genre}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Limit</span>
                            <span className="productInfoValue">{movie.limit}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Is Series:</span>
                            <span className="productInfoValue">{movie.isSeries}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Movie Title</label>
                        <input type="text" name="title" placeholder={movie.title} onChange={handleChange}/>
                        <label>Year</label>
                        <input type="text" name="year" placeholder={movie.year} onChange={handleChange}/>
                        <label>Genre</label>
                        <input type="text" name="genre" placeholder={movie.genre} onChange={handleChange}/>
                        <label>Limit</label>
                        <input type="text" name="limit" placeholder={movie.limit} onChange={handleChange}/>
                        <label>Image</label>
                        <input type="file" onChange={(e)=>setImg(e.target.files[0])}/>
                       {/*   <label>Video</label>
                        <input type="file"  /> */}
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={movie.img} alt="" className="productUploadImg" />
                            <label for="file">
                                <PublishIcon/>
                            </label>
                            <input type="file" id="file" style={{display:"none"}} />
                        </div>
                        {
                            uploaded===1?(<button className="productButton" onClick={()=>handleUpdate(movie._id)}>Update</button>):(<button className="productButton" onClick={handleUpload}>Upload</button>)
                        }
                        
                       
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Product
