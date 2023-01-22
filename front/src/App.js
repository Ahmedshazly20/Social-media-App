import React from 'react'
import Nav from './component/nav/nav'
import Posts from './component/UT-Post/Posts/Posts'
import AddPost from './component/add-post/AddPost'
import {BrowserRouter,Routes,Route,} from "react-router-dom";
import Singlepost from './component/UT-Post/Singel-post/Singlepost';
function App() {
 

  return (
    <div>
    
      <Nav/>
      
      <BrowserRouter>
      <Routes>
      
      <Route path="/"  element={<AddPost/>}/>
      
       <Route path="/feed/posts/:postId" element={<Singlepost/>}/>
      </Routes>
      </BrowserRouter>
      
    
  </div>
  )
}

export default App