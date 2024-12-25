import mongoose from "mongoose";


const dbURL = 'mongodb://127.0.0.1:27017/instagram_chating'

const connectDB = async () =>{
    try {
        await mongoose.connect(dbURL)
        console.log("DATABASE CONNECTED")
    } catch (error) {
        console.error("Some Problem while connecting to the db.")
    }
}   

export default connectDB;