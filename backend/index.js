import express from 'express';
import cors from 'cors';
import pdfRoute from './routes/pdfRoute.js'
import chatRoute from './routes/chatRoute.js'

const app=express()

app.use(cors({
    origin:"*"
}));

app.use(express.json());

app.get('/health',(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"Server is running"
    })
})

app.use('/api/v1/pdf',pdfRoute)
app.use('/api/v1/chat',chatRoute)

app.listen(4000,()=>{
    console.log("Server started at port ",4000);
})