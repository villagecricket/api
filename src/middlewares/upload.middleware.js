const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { imageFileFilter, generateFileName } = require('../utils/file.util.js');

const uploadDir = path.join(process.cwd(), 'uploads/players');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, generateFileName(file));
    }
});

const uploadPlayerImage = multer({
    storage,
    fileFilter: imageFileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024
    }
});

module.exports = {
    uploadPlayerImage
};

