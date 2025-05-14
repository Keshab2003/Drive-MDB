const express = require('express');
const userRouter = require('./routes/user.route');
const indexRouter = require('./routes/index.route');

// ------------------------------------------------------------------------------
// const mongoose = require('mongoose');
// const multer = require('multer');
// const Grid = require('gridfs-stream');
// const { GridFsStorage } = require('multer-gridfs-storage');
// const multer-gridfs-storage = require('multer-gridfs-storage');
// ------------------------------------------------------------------------------
const cookieParser = require('cookie-parser');

const connectToDB = require('./config/db');
connectToDB();

const dotenv = require('dotenv');
dotenv.config();



const user = require('./models/userModel');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine' , 'ejs');
app.use(cookieParser());

app.use('/user' , userRouter);//user/register
app.use('/', indexRouter);


// ------------------------------------------------------------------------------

// let gfs;
// const conn = mongoose.connection; // Get the default connection object

// conn.once('open', () => {
//     gfs = Grid(conn.db, mongoose.mongo); // Use the connection's database object
//     gfs.collection('uploads'); // Set the GridFS collection name
//     console.log('GridFS initialized');
// });

// // GridFS storage engine
// const storage = new GridFsStorage({
//     url: process.env.MONGO_URI,
//     file: (req, file) => {
//         return {
//             filename: file.originalname,
//             bucketName: 'uploads', // Bucket name in MongoDB
//         };
//     },
// });

// const upload = multer({ storage });

// app.post('/upload-file', upload.single('file'), (req, res) => {
//     res.status(200).json({ file: req.file, message: 'File uploaded successfully!' });
// });



// // Get all files
// app.get('/files', async (req, res) => {
//     gfs.files.find().toArray((err, files) => {
//         if (!files || files.length === 0) {
//             return res.status(404).json({ message: 'No files found' });
//         }
//         res.status(200).json(files);
//     });
// });


// // Download file by filename
// app.get('/files/:filename', (req, res) => {
//     gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//         if (!file || file.length === 0) {
//             return res.status(404).json({ message: 'File not found' });
//         }

//         // Check if file is readable
//         if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'application/pdf') {
//             const readStream = gfs.createReadStream(file.filename);
//             readStream.pipe(res);
//         } else {
//             res.status(404).json({ message: 'File not supported' });
//         }
//     });
// });
// ------------------------------------------------------------------------------




app.get('/check-bucket', async (req, res) => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        const bucketCollections = collections.filter(col => col.name.startsWith('uploads'));
        res.status(200).json(bucketCollections);
    } catch (error) {
        res.status(500).json({ message: 'Error checking bucket', error });
    }
});






app.listen(3000 , () => {
    console.log('Server is running on port 3000');
})
