const  {validationResult } = require("express-validator")
const Post = require('../models/posts')
const {Error} = require("mongoose");
 
exports.getPosts =(req,res,next)=>{
   Post.find()
  .then(posts => {
    res
      .status(200)
      .json({ message: 'Fetched posts successfully.', posts: posts });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};
exports.CreatePost= (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        const  error = new Error('validation failed , entered data is incorrect.')
        error.statuscode= 422;
        throw error;

        //return res.status(422).join({massage:'validation failed , entered data is incorrect.' , errors:errors.array()})
   }
    if(!req.file){
        const  error = new Error('validation failed , entered data is incorrect.')
        error.statuscode= 422;
        throw error;
    }
    const imageUrl = req.file.path.replace("\\" ,"/");
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        title: title,
        Contenet: content,
        ImgUrl: imageUrl,
        Creator: { name: 'Maximilian' }
    });

    post.save()
    .then(result => {
      res.status(201).json({
        message: 'Post created successfully!',
        post: result
      });
    }).catch(err=>{
      if(!err.statuscode){
        err.statuscode = 500;
      }
      next(err);})}

      exports.getPost= (req ,res , next)=>{
        const postId = req.params.postId
        Post.findById(postId).then(
          post =>{
            if(!post){
               const error = new Error('Could not find post ')
               error.statuscode=404;
               throw error;
            }
            res.status(200).json({Massage: 'post fetched', post:post})
          }
        ).catch(err=>{
          if(!err.statuscode){
            err.statuscode = 500;
          }
          next(err);})
      }
      
  exports.updatePost=(req,res,next)=>{
    const postId = req.params.postId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
    }
    const title = req.body.title;
    const content = req.body.content;
    let imageUrl = req.body.image;
    if (req.file) {
      imageUrl = req.file.path;
    }
    if (!imageUrl) {
      const error = new Error('No file picked.');
      error.statusCode = 422;
      throw error;
    }
    Post.findById(postId)
      .then(post => {
        if (!post) {
          const error = new Error('Could not find post.');
          error.statusCode = 404;
          throw error;
        }
        if (imageUrl !== post.ImgUrl) {
          clearImage(post.ImgUrl);
        }
        post.title = title;
        post.ImgUrl = imageUrl;
        post.Contenet = content;
        return post.save();
      })
      .then(result => {
        res.status(200).json({ message: 'Post updated!', post: result });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };
  
  const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
  }    