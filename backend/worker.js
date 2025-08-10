import 'dotenv/config';
import { workerCallback } from './controllers/workerController.js'
import { Worker } from 'bullmq';

const worker = new Worker('pdf-queue',workerCallback,{
  concurrency:100,
  connection:{
    host: process.env.QUEUE_URL,
    port: process.env.QUEUE_PORT,
}});
