import mongoose from "mongoose";
import logger from "./logger.js";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        logger.info("MongoDB server started successfully!")
    }
    catch(err){
        logger.error(err)
        process.exit(1)
    }
}

export default connectDB