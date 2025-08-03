import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { Queue } from 'bullmq';
import { ChatGroq } from "@langchain/groq";
import { QdrantVectorStore } from "@langchain/qdrant";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import 'dotenv/config'

const queue=new Queue('pdf-queue',{
    connection:{
    host: 'localhost',
    port: 6379,
}
})

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

app.use(cors({
    origin:"*"
}));

app.use(express.json());

app.get('/',(req,res)=>{
    console.log("Healthy");
})

app.post('/upload/pdf',upload.single('pdf'),async(req,res)=>{
    if (!req.file) {
        return res.status(400).json({ 
            message: 'No file uploaded' 
        })
    }
    await queue.add('pdf-processing', JSON.stringify(
        {
        filePath: req.file.path,
        fileName: req.file.filename,
        source: req.file.destination
    }
    ));
    
    return res.status(200).json({
        success:true,
        message:"File uploaded successfully"
    })
})

app.post('/chat',async(req,res)=>{
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ 
            message: 'Message is required' 
        });
    }

    const embeddings=new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GEMINI_API_KEY,
        model: "text-embedding-004",
      })

    const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
          url: 'http://localhost:6333',
          collectionName: "pdf-collection",
        });

    const retriever = vectorStore.asRetriever({ k: 5,searchType:'mmr' });

    const model = new ChatGroq({
        apiKey: process.env.GROQ_API_KEY,
        model: "llama3-8b-8192",
        temperature: 0.5,
        maxTokens: 1000,
    });

    const prompt=PromptTemplate.fromTemplate(`
         You are a helpful assistant. Use the following transcript as the only context to answer the user's question accurately.
            Transcript:{transcript}
            User question:{question}
            Answer the question based solely on the transcript above. If the transcript does not contain the answer, reply: "Sorry, I don't have that information."
        `
    )

    const similar_docs=await retriever.invoke(message)

    const filtered_docs = similar_docs.map(doc => doc.pageContent).join(' ');

    console.log("similar docs are ",filtered_docs);

    const final_prompt=await prompt.invoke({
        transcript: filtered_docs,
        question: message
    })

    console.log("Final prompt is ",final_prompt);
    

    const response=await model.invoke(final_prompt)

    console.log(response.content);
    
    return res.status(200).json({
        success: true,
        message: "Chat response",
        data: response.content
    });
})

app.listen(4000,()=>{
    console.log("Server started at port ",4000);
})