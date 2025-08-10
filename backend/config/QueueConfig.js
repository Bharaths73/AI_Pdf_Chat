import { Queue } from 'bullmq';

export const queue=new Queue('pdf-queue',{
    connection:{
    host: 'localhost',
    port: 6379,
}
})
