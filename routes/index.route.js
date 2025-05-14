const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config');
const mongoose = require('mongoose');
const fileModel = require('../models/files.models');
const authMiddleware = require('../middlewares/authe');


router.get('/home' ,authMiddleware, async (req , res) => {

    const userFiles = await fileModel.find({
        user:req.user.id
    });
    console.log(userFiles);
    res.render('home' , {
        files:userFiles
    });
});


router.post('/upload' ,authMiddleware, upload.single('file') , async (req,res) => {

    const newFile = await fileModel.create({
        // path:req.file.path,
        id : req.file._id,
        originalname:req.file.originalname,
        user:req.user.id
    })

    res.json(newFile);




    // if (!req.file) {
    //     return res.status(500).json({ message: 'File upload failed' });
    // }

// ------------------------------------------------------------------------------------------------
                                    // errorfull code

    // const originalName = req.file.originalname;

    // // Send a response with the original file name
    // res.status(200).json({
    //     message: 'File uploaded successfully!',
    //     originalName: originalName,
    //     file: req.file,
    // });
    // res.send(req.file);



    // try {
    //     // Fetch the file metadata from MongoDB
    //     const file = await mongoose.connection.db.collection('uploads.files').findOne({ filename: req.file.filename });
    //     if (!file) {
    //         return res.status(404).json({ message: 'File metadata not found' });
    //     }

    //     res.status(200).json({
    //         message: 'File uploaded successfully!',
    //         file: file, // Return the file metadata from MongoDB
    //     });
    // } catch (error) {
    //     res.status(500).json({ message: 'Error retrieving file metadata', error });
    // }



// ------------------------------------------------------------------------------------------------


    // try {
    //     // Create a GridFSBucket instance
    //     const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    //         bucketName: 'uploads', // Ensure this matches your bucket name
    //     });

    //     // Create a readable stream from the uploaded file
    //     const readableStream = require('stream').Readable();
    //     readableStream.push(req.file.buffer);
    //     readableStream.push(null);

    //     // Upload the file to GridFS
    //     const uploadStream = bucket.openUploadStream(req.file.originalname, {
    //         contentType: req.file.mimetype,
    //     });

    //     readableStream.pipe(uploadStream);

    //     uploadStream.on('finish', () => {
    //         res.status(200).json({
    //             message: 'File uploaded successfully!',
    //             file: {
    //                 _id: uploadStream.id,
    //                 filename: req.file.originalname,
    //                 contentType: req.file.mimetype,
    //             },
    //         });
    //     });

    //     uploadStream.on('error', (error) => {
    //         res.status(500).json({ message: 'Error uploading file', error });
    //     });
    // } catch (error) {
    //     res.status(500).json({ message: 'Error uploading file', error });
    // }
})



// router.post('/upload', upload.single('file'), (req, res) => {
//     console.log('Uploaded file:', req.file); // Log the file object
//     if (!req.file) {
//         return res.status(500).json({ message: 'File upload failed' });
//     }
//     res.status(200).json({
//         message: 'File uploaded successfully!',
//         file: req.file,
//     });
// });


//id is replaced by path
// router.get('/download/:_id' , authMiddleware , async(req,res) =>{
//     const loggedInUserId = req.user.id;
//     const id = req.params.id;

//     const file = await fileModel.findOne({
//         user:loggedInUserId,
//         id:id
//     })

//     if(!file){
//         return res.status(401).json({
//             message: 'File not found , Unauthorized'
//         })
//     }

//     res.download(file._id);
// })



// router.get('/download/:id', async (req, res) => {
//     // try {
//     //     const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
//     //         bucketName: 'uploads', // Ensure this matches your bucket name
//     //     });

//     //     // Find the file by its ID
//     //     const file = await mongoose.connection.db.collection('uploads.files').findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
//     //     if (!file) {
//     //         return res.status(404).json({ message: 'File not found' });
//     //     }

//     //     // Set the response headers
//     //     res.set('Content-Type', file.contentType);
//     //     res.set('Content-Disposition', `attachment; filename="${file.filename}"`);

//     //     // Stream the file to the client
//     //     const downloadStream = bucket.openDownloadStream(file._id);
//     //     downloadStream.pipe(res);

//     //     downloadStream.on('error', (err) => {
//     //         res.status(500).json({ message: 'Error downloading file', error: err });
//     //     });
//     // } catch (error) {
//     //     res.status(500).json({ message: 'Error retrieving file', error });
//     // }
//     try {
//         const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
//             bucketName: 'uploads', // Ensure this matches your bucket name
//         });

//         // Convert the string ID to a MongoDB ObjectId
//         const fileId = new mongoose.Types.ObjectId(req.params.id);

//         // Find the file by its ID
//         const file = await mongoose.connection.db.collection('uploads.files').findOne({ _id: fileId });
//         if (!file) {
//             return res.status(404).json({ message: 'File not found' });
//         }

//         // Set the response headers
//         res.set('Content-Type', file.contentType);
//         res.set('Content-Disposition', `attachment; filename="${file.filename}"`);

//         // Stream the file to the client
//         const downloadStream = bucket.openDownloadStream(fileId);
//         downloadStream.pipe(res);

//         downloadStream.on('error', (err) => {
//             res.status(500).json({ message: 'Error downloading file', error: err });
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Error retrieving file', error });
//     }
// });


router.get('/download/:originalname', async (req, res) => {
    try {
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: 'uploads', // Ensure this matches your bucket name
        });

        // Find the file by its originalname
        const file = await mongoose.connection.db.collection('uploads.files').findOne({ filename: req.params.originalname });
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Set the response headers
        res.set('Content-Type', file.contentType);
        res.set('Content-Disposition', `attachment; filename="${file.filename}"`);

        // Stream the file to the client
        const downloadStream = bucket.openDownloadStreamByName(req.params.originalname);
        downloadStream.pipe(res);

        downloadStream.on('error', (err) => {
            res.status(500).json({ message: 'Error downloading file', error: err });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving file', error });
    }
});

module.exports = router;
