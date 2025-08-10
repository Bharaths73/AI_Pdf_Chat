
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import 'dotenv/config';

export const workerCallback = async (job) => {
    try {
        const data = JSON.parse(job.data)

        const loader = new PDFLoader(data.filePath);
        const docs = await loader.load();

        const textsplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        })

        const texts = await textsplitter.splitDocuments(docs)

        // console.log(texts[0]);

        const embeddings = new GoogleGenerativeAIEmbeddings({
            apiKey: process.env.GEMINI_API_KEY,
            model: "text-embedding-004",
        })
        const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
            url: process.env.VECTOR_STORE_URL,
            collectionName: "pdf-collection",
        });
        await vectorStore.addDocuments(texts);
    } catch (error) {
        console.log("Error in worker ", error);
    }
}