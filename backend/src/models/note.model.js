import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    body: {
        type: String,
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }
    ,
    createdAt: {
        type:  Date,
        default: Date.now
    }
})

export default mongoose.model("Note", NoteSchema)