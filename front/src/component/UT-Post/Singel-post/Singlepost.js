import React, { useEffect,useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import './Singel.css'


function Singlepost() {
  const routeParams = useParams();
  const [Post, setPost] = useState("");
  const [ImgUrl, setImgUrl] = useState("");
  
  useEffect ( () => {
    const PostId = routeParams.postId
     axios.get('/feed/post/'+PostId)
     .then(res=>{setPost(res.data.post)
      setImgUrl(`http://localhost:8080/${res.data.post.ImgUrl}`)})
     .catch(error=>{console.log(error)})
     
  },[routeParams])




  return (
    <div>
      
      <div key={Post._id}>
      <div className="SinglePost">
      <h2 className="header">{Post.title}</h2>
      <span>{Post.createdAt}</span>
        <img src={ImgUrl} alt="post img"/>
      <p>{Post.Contenet}</p>
    </div>
    
  
     </div>
    </div>
  )
}

export default Singlepost