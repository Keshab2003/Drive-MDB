const multer = require('multer');
const Grid = require('gridfs-stream');
const { GridFsStorage } = require('multer-gridfs-storage');
require('dotenv').config();


const url = process.env.MONGO_URI;

// Create a storage object with a given configuration
// const storage = new GridFsStorage({url});

// const storage = new GridFsStorage({
//     url,
//     options: { useNewUrlParser: true, useUnifiedTopology: true }, // Ensure proper connection options
//     // file: (req, file) => {
//     //     return {
//     //         filename: file.originalname, // Use the original file name
//     //         bucketName: 'uploads', // Bucket name in MongoDB
//     //     };
//     // },

//     file: (req, file) => {
//         const timestamp = Date.now();
//         const originalName = file.originalname || `file_${timestamp}`;
//         return {
//             filename: `${timestamp}_${originalName}`, // Add a timestamp to the filename
//             bucketName: 'uploads',
//             metadata: { originalName: file.originalname },
//         };
//     },
// });


const storage = multer.memoryStorage();

// Set multer storage engine to the newly created object
const upload = multer({ storage });

module.exports = upload;