const mongoose = require('mongoose')
const schema = mongoose.Schema;

const PostSchema = new schema({
    title: {
      type:String,
      required:true
    },
   ImgUrl:{
        type:String,
        required:true},

   Contenet:{
    type:String,
    required:true},

   Creator:{
    type:Object,
    required:true
   }


},{timestamps:true})

module.exports = mongoose.model('Post',PostSchema)