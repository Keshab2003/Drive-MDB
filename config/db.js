// const mongoose = require('mongoose');

// const connectToDB = (() => {
//      mongoose.connect(process.env.MONGO_URI).then(() => {
//         console.log('Connected to MongoDB');
//      })
// });


// module.exports = connectToDB;



const mongoose = require('mongoose');
require('dotenv').config();

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit the process with failure
    }
};
// connectToDB();
console.log('MONGO_URI:', process.env.MONGO_URI);
module.exports = connectToDB;