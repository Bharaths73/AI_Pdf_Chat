import express from 'express';
import { uploadPdf } from '../controllers/pdfController.js';
import multer from 'multer';
import { storage } from '../config/MulterConfig.js';
const upload=multer({storage:storage})

const router = express.Router();

router.post('/upload/pdf',upload.single('pdf'),uploadPdf)

export default router;