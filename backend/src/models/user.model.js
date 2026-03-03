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
    notesCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

export default mongoose.model("Users", UserSchema)