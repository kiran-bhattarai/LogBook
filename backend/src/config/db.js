import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB server started successfully!")
    }
    catch(err){
        console.error(err)
        process.exit(1)
    }
}