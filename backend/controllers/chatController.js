import { ChatGroq } from "@langchain/groq";
import { QdrantVectorStore } from "@langchain/qdrant";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { MultiQueryRetriever } from "langchain/retrievers/multi_query";
import { ContextualCompressionRetriever } from "langchain/retrievers/contextual_compression";
import { LLMChainExtractor } from "langchain/retrievers/document_compressors/chain_extract";
import 'dotenv/config'

export const chatWithPdf = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                message: 'Message is required'
            });
        }

        const embeddings = new GoogleGenerativeAIEmbeddings({
            apiKey: process.env.GEMINI_API_KEY,
            model: "text-embedding-004",
        })

        const parser = new StringOutputParser();

        const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
            url: process.env.VECTOR_STORE_URL,
            collectionName: "pdf-collection",
        })

        const retriever = vectorStore.asRetriever({ k: 5, searchType: 'mmr' });

        const model = new ChatGroq({
            apiKey: process.env.GROQ_API_KEY,
            model: "llama3-8b-8192",
            temperature: 0.5,
            maxTokens: 1000,
        });

        const prompt = PromptTemplate.fromTemplate(`
         You are an assistant for question-answering tasks. Use the following pieces of retrieved context to answer the question. If you don't know the answer, just say that you don't know. Use three sentences maximum and keep the answer concise.
        Question: {question} 
        Context: {context} 
        Answer:
        `
        )

        //Filter, re-rank, query optimization, streaming or compress retrieved results as needed.

        // const multiRetriever = MultiQueryRetriever.fromLLM({ retriever: retriever, llm: model});

        // const compressor = LLMChainExtractor.fromLLM(model);

        // const compressionRetriever = new ContextualCompressionRetriever({
        //     baseCompressor: compressor,
        //     baseRetriever: multiRetriever,
        // });

        const similar_docs = await retriever.invoke(message)

        // const uniqueDocs = Array.from(new Map(
        // similar_docs.map(doc => [doc.metadata.source + doc.metadata.pageNumber, doc])
        // ).values());

        const filtered_docs = similar_docs.map((doc, i) => `Chunk ${i + 1}:\n${doc.pageContent}`).join('\n\n');

        const final_prompt = await prompt.invoke({
            context: filtered_docs,
            question: message
        })

        const response = await model.invoke(final_prompt)

        const parsed_output = await parser.parse(response.content)

        return res.status(200).json({
            success: true,
            message: "Chat response",
            data: parsed_output
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error:error
        })
    }
}