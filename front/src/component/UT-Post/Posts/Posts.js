import React,{useState,useEffect} from 'react'
import Container from '@mui/material/Container';
import './posts.css'


function Posts() {
    const [AllP, setAllP] = useState([]);

    useEffect ( () => {
        fetch('/feed/posts', {method:'GET'})
        .then(res=>res.json())
        .then(res=>{setAllP(res.posts)})
        .catch(error=>{console.log(error)})
      },[])
    


   
  return (
      <div>
      <Container maxWidth="xl">
 
      
       <br/>
        <div>   
       {AllP.map(ad=>{return(<div key={ad._id} className="post">
       <div className="">
       <div className="hestory">posted by Ahmed on 10/01/2023</div>
       <h2>{ad.title}</h2>
       <p>  {ad.Contenet}</p>
       <div className="Editing">
           <ul>
           <li> <a href={"/feed/posts/"+ad._id }>view</a> </li>
           <li><a href="/">edit</a> </li>
           <li><a href="/">delete</a> </li>
           </ul>
   </div>
       </div>
   
           </div>)})}
         
       </div>
       
        

   </Container>
      </div>
   
    
  )
}

export default Posts