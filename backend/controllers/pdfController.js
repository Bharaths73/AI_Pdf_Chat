import { queue } from "../config/QueueConfig.js";

export const uploadPdf = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: 'No file uploaded'
            })
        }
        const allowedMimeTypes = ['application/pdf'];

        if (!req.file || !allowedMimeTypes.includes(req.file.mimetype)) {
            return res.status(400).json({ message: 'Invalid file uploaded, only PDFs allowed' });
        }

        await queue.add('pdf-processing', JSON.stringify(
            {
                filePath: req.file.path,
                fileName: req.file.filename,
                source: req.file.destination
            }
        ));

        return res.status(200).json({
            success: true,
            message: "File uploaded successfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error
        })
    }
}