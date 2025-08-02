const multer = require('multer');
const express=require('express');
const cors=require('cors')

const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/');
    },
    filename:function(req,file,cb){
        const uniqueSuffix=Date.now()+'-'+Math.round(Math.random()*1e9);
        cb(null,`${uniqueSuffix}-${file.originalname}`)
    }
})

const upload=multer({storage:storage})

const app=express()

app.use(cors(
    origin="*"
));

app.get('/',(req,res)=>{
    console.log("Healthy");
})

app.post('/upload/pdf',upload.single('pdf'),(req,res)=>{
    return res.json({
        success:true,
        message:"File uploaded successfully"
    })
})

app.listen(4000,()=>{
    console.log("Server started at port ",4000);
})