const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 8080
const bodyParser = require('body-parser')
const expressvalidator = require("express-validator")
const feedRoute = require('./Routes/feeds')
const path = require('path')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
//app.use(bodyParser.urlencoded())

app.use(bodyParser.json())
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null,  uuidv4()+ '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

app.use('/feed',feedRoute)

app.use((error,req,res, next)=>{
    console.log(error);
    const stats = error.statscode || 500;
    const message = error.message;
    res.status(stats).json({message:message})
});
mongoose.set('strictQuery', false);
hello 
app.get('/', (req, res) => res.send('Hello World!'))
