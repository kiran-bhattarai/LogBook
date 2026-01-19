import mongoose from "mongoose";

const RefreshTokenSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true},
    tokenId: { type: String, required: true },
    tokenHash: { type: String, required: true },
    ip: { type: String, default: "0.0.0.0" },
    device: { type: String, default: "Unknown" },
    createdAt: { type: Date, default: Date.now() },
    expiresAt: { type: Date, required: true }
})

export default mongoose.model("RefreshToken", RefreshTokenSchema)