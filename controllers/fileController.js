const multer = require('multer');
const xlsx = require('xlsx');
const File = require('../models/File');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');

// Define the uploadFile function
const uploadFile = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ msg: 'File upload error', error: err });
        }
        if (!req.file) {
            return res.status(400).json({ msg: 'No file uploaded.' });
        }
        try {
            const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = xlsx.utils.sheet_to_json(worksheet);

            const newFile = new File({
                fileName: req.file.originalname,
                data: jsonData,
                uploadedBy: req.user.id
            });

            await newFile.save();
            
            res.status(201).json({ 
                msg: 'File uploaded and parsed successfully', 
                fileName: newFile.fileName, 
                fileId: newFile._id,
                data: jsonData
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    });
};

// Define the getUploadHistory function separately
const getUploadHistory = async (req, res) => {
    try {
        const files = await File.find({ uploadedBy: req.user.id }).sort({ uploadDate: -1 });
        res.json(files);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Export both functions together
module.exports = {
    uploadFile,
    getUploadHistory
};