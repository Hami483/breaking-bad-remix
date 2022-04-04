import mongoose from "mongoose";

const CommentsSchema = new mongoose.Schema({
    episode: {
        type: String
    },
    comments: { type: [String], default: [] }
},{timestamps: true})

export default mongoose.models.Comment || mongoose.model("Comment", CommentsSchema);