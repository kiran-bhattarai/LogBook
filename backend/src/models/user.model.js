import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type:  Date,
        default: new Date()
    }
})

export default mongoose.model("Users", UserSchema)