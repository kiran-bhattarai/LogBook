import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        select: false
    },
    avatar: {
        type: String,
    },
    providers: {
        google: {
            id: String,
        },
        facebook: {
            id: String,
        },
        local: {
            type: Boolean,
            default: false,
        },
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
}, { timestamps: true })

export default mongoose.model("Users", UserSchema)