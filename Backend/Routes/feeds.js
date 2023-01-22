const express = require('express')
const {body}= require("express-validator")
const feedControler =require('../Controller/feeds');


const router = express.Router();

router.get('/posts',feedControler.getPosts)

router.post('/post',feedControler.CreatePost)

router.get('/post/:postId',feedControler.getPost);

router.put('/post/:postId',feedControler.updatePost)

module.exports = router