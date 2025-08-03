import {Worker} from "bullmq";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import 'dotenv/config';

const worker = new Worker('pdf-queue', async job => {
  console.log("Job started:", job.id);
  const data=JSON.parse(job.data)

  const loader = new PDFLoader(data.filePath);
  const docs = await loader.load();

  const textsplitter=new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  })

  const texts=await textsplitter.splitDocuments(docs)

  console.log(texts[0]);
  
  
  const embeddings=new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    model: "text-embedding-004",
  })
     
  try{
    const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
      url: 'http://localhost:6333',
      collectionName: "pdf-collection",
    });
    await vectorStore.addDocuments(texts);
  }
  catch (error) {
    console.error("Error creating vector store:", error);
  }

  console.log("Vector store created and persisted successfully.");
},{concurrency:100,connection:{
    host: 'localhost',
    port: 6379,
}});
