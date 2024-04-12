const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            socketTimeoutMS: 1000
        });
    } catch (error) {
        console.log(error)
    }   
}
module.exports = connectDB;