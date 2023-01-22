import React, { useState } from "react";
import "./Addpost.css";
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue ,red } from '@mui/material/colors';
import Axios  from "axios";
import Posts from "../UT-Post/Posts/Posts";
export default function AddPost() {
const [modal, setModal] = useState(false);
const [title, settitle]=useState("")
const [content, setcontent]=useState("")
const [file, setFile] = useState();








function handleChange(event) {
  setFile(event.target.files[0])
}

function SendRequist(event) {
  event.preventDefault()

  console.log();
  
  const formData = new FormData();
  formData.append('image', file);
  formData.append('title', title);
  formData.append('content', content);
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  

  
  Axios.post('/feed/post', 
  {
        title:title,
    content:content,
    image:file
  },config
  
  ).then((response) => {
    console.log(response.data);
  });
  toggleModal();

}




  const theme = createTheme({
    palette: {
      primary: {
        main: blue[800],
      },
      secondary: {
        main: red[800],
      },
    },
  });

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  


  return (
    <>
    <div className="btn-modal">
        <Button variant="outlined" className="center" onClick={toggleModal} >
        NEW POST  
        </Button>
      

    </div>
    <Posts/>
      {modal && (
        <div className="modal">
         <form onSubmit={SendRequist} >
          <ThemeProvider theme={theme}>
          <div onClick={toggleModal} className="overlay"></div>

          <div className="modal-content">
              <h2 className="header-POST">Add NEW POST</h2>
            <TextField required name="title" onChange={(e)=>{settitle(e.target.value)}}  sx={{my: 2,}} id="outlined-required" label="Title" fullWidth defaultValue="Hello World"/>
                
            <div class="upload">
                  <CloudUploadIcon/> 
                  <input type="file" onChange={handleChange}  name="image"/>
              </div>
            <TextareaAutosize  onChange={(e)=>{setcontent(e.target.value)}} required aria-label="minimum height" minRows={3} placeholder="Type your post here" name="content"  style={{ width: 600 , height:200 }} />
            <Button type="submit" variant="contained" sx={{mt:5}} endIcon={<SendIcon />}>Send POST</Button>
            <Button  variant="outlined" color="secondary" sx={{mt:5,ml:3}} className=" " onClick={toggleModal} endIcon={<CloseSharpIcon />}>discard</Button>
              
          </div>
          </ThemeProvider>
          </form>
        </div>
        
      )}
     
    </>
  );
}